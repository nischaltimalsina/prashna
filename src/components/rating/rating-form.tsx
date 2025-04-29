"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Define the schema for the rating form
const ratingFormSchema = z.object({
  integrity: z.number().min(1).max(5),
  responsiveness: z.number().min(1).max(5),
  effectiveness: z.number().min(1).max(5),
  transparency: z.number().min(1).max(5),
  comment: z.string().max(200, {
    message: "Comment must not be longer than 200 characters.",
  }).optional(),
});

// Define the props for the RatingForm component
type RatingFormProps = {
  politicianId: string;
  politicianName: string;
  onRatingSubmitted?: () => void;
};

// Define the type for form values
type RatingFormValues = z.infer<typeof ratingFormSchema>;

export function RatingForm({ politicianId, politicianName, onRatingSubmitted }: RatingFormProps) {
  const [open, setOpen] = React.useState(false);

  // Initialize the form
  const form = useForm<RatingFormValues>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      integrity: 3,
      responsiveness: 3,
      effectiveness: 3,
      transparency: 3,
      comment: "",
    },
  });

  // Calculate overall rating
  const calculateOverallRating = (values: RatingFormValues) => {
    const { integrity, responsiveness, effectiveness, transparency } = values;
    return ((integrity + responsiveness + effectiveness + transparency) / 4).toFixed(1);
  };

  // Handle form submission
  const onSubmit = async (values: RatingFormValues) => {
    // In a real app, you'd send this to your API
    try {
      // Mock API call
      console.log("Submitting rating:", { politicianId, ...values });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast("Rating submitted",{
        description: `You rated ${politicianName} ${calculateOverallRating(values)}/5 stars.`,
      });

      // Close the dialog
      setOpen(false);

      // Call the callback if provided
      if (onRatingSubmitted) {
        onRatingSubmitted();
      }
    } catch (error) {
      // Show error message
      toast.error("Error submitting rating", {
        description: "There was a problem submitting your rating. Please try again.",
      });
    }
  };

  // Helper to format the rating value for display
  const formatRating = (value: number[]) => `${value[0]}/5`;

  // Helper to get label for Slider component based on value
  const getRatingLabel = (value: number) => {
    switch(value) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "Select";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ThumbsUp className="mr-2 h-4 w-4" />
          Rate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Rate {politicianName}</DialogTitle>
          <DialogDescription>
            Please rate this representative on multiple dimensions. Your feedback helps improve democratic accountability.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Integrity Rating */}
            <FormField
              control={form.control}
              name="integrity"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>Integrity</FormLabel>
                    <Badge variant="outline" className="font-normal">
                      {getRatingLabel(field.value)} ({field.value}/5)
                    </Badge>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Honesty, ethical conduct, and consistency between words and actions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Responsiveness Rating */}
            <FormField
              control={form.control}
              name="responsiveness"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>Responsiveness</FormLabel>
                    <Badge variant="outline" className="font-normal">
                      {getRatingLabel(field.value)} ({field.value}/5)
                    </Badge>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Communication with citizens and addressing constituent concerns.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Effectiveness Rating */}
            <FormField
              control={form.control}
              name="effectiveness"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>Effectiveness</FormLabel>
                    <Badge variant="outline" className="font-normal">
                      {getRatingLabel(field.value)} ({field.value}/5)
                    </Badge>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Ability to achieve policy objectives and deliver results.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transparency Rating */}
            <FormField
              control={form.control}
              name="transparency"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>Transparency</FormLabel>
                    <Badge variant="outline" className="font-normal">
                      {getRatingLabel(field.value)} ({field.value}/5)
                    </Badge>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Openness about decisions, actions, and public information.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Overall Rating Display */}
            <div className="bg-muted/30 rounded-lg p-4 my-4">
              <div className="text-center">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Overall Rating</h4>
                <div className="text-2xl font-bold">
                  {calculateOverallRating(form.getValues())}/5
                </div>
              </div>
            </div>

            {/* Comment Field */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with this representative..."
                      className="resize-none"
                      {...field}
                      maxLength={200}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>Provide specific examples to support your rating.</span>
                    <span className="text-muted-foreground">{field.value?.length || 0}/200</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Actions */}
            <DialogFooter>
              <Button type="submit">Submit Rating</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
