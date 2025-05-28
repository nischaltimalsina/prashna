'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRateOfficial } from '@/hooks/useOfficials';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Official } from '@/lib/api/types';

const ratingSchema = z.object({
  integrity: z.number().min(1).max(5),
  responsiveness: z.number().min(1).max(5),
  effectiveness: z.number().min(1).max(5),
  transparency: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(500),
  evidence: z.string().url().optional().or(z.literal('')),
});

type RatingFormData = z.infer<typeof ratingSchema>;

interface EnhancedRatingFormProps {
  official: Official;
  onSuccess?: () => void;
}

export function RatingForm({ official, onSuccess }: EnhancedRatingFormProps) {
  const [open, setOpen] = useState(false);
  const { mutate: rateOfficial, isPending } = useRateOfficial();

  const form = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      integrity: 3,
      responsiveness: 3,
      effectiveness: 3,
      transparency: 3,
      comment: '',
      evidence: '',
    },
  });

  const onSubmit = (data: RatingFormData) => {
    rateOfficial(
      {
        officialId: official.id,
        rating: data,
      },
      {
        onSuccess: () => {
          toast.success('Rating submitted successfully!');
          setOpen(false);
          form.reset();
          onSuccess?.();
        },
        onError: (error) => {
          toast.error('Failed to submit rating. Please try again.');
          console.error('Rating error:', error);
        },
      }
    );
  };

  const calculateOverall = () => {
    const values = form.getValues();
    return (
      (values.integrity + values.responsiveness + values.effectiveness + values.transparency) / 4
    ).toFixed(1);
  };

  const getRatingLabel = (value: number) => {
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[value as keyof typeof labels] || 'Select';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Rate {official.name}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rate {official.name}</DialogTitle>
          <DialogDescription>
            Provide your assessment of this official's performance. Your feedback helps improve transparency and accountability.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Rating Dimensions */}
            {(['integrity', 'responsiveness', 'effectiveness', 'transparency'] as const).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field}
                render={({ field: formField }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="capitalize">{field}</FormLabel>
                      <Badge variant="outline">
                        {getRatingLabel(formField.value)} ({formField.value}/5)
                      </Badge>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[formField.value]}
                        onValueChange={(value) => formField.onChange(value[0])}
                        className="py-"
                      />
                    </FormControl>
                    <FormDescription>
                      {field === 'integrity' && 'Honesty, ethical conduct, consistency between words and actions'}
                      {field === 'responsiveness' && 'Communication with citizens and addressing concerns'}
                      {field === 'effectiveness' && 'Ability to achieve objectives and deliver results'}
                      {field === 'transparency' && 'Openness about decisions and public information'}
                    </FormDescription>
                  </FormItem>
                )}
              />
            ))}

            {/* Overall Rating Display */}
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Overall Rating
              </h4>
              <div className="text-2xl font-bold">{calculateOverall()}/5</div>
            </div>

            {/* Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience and provide specific examples..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>Provide specific examples to support your rating</span>
                    <span>{field.value.length}/500</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Evidence URL */}
            <FormField
              control={form.control}
              name="evidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidence URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/evidence"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to supporting evidence (news articles, official statements, etc.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit Rating'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
