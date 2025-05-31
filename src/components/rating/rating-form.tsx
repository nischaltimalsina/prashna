"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/useAuth"
import { useRateOfficial } from "@/hooks/useOfficials"
import { Official } from "@/lib/api/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { RatingInput } from "./rate-input"
import { AlertCircle, Star } from "lucide-react"
import Link from "next/link"

const ratingSchema = z.object({
  integrity: z.number().min(1, "Please rate integrity").max(5),
  responsiveness: z.number().min(1, "Please rate responsiveness").max(5),
  effectiveness: z.number().min(1, "Please rate effectiveness").max(5),
  transparency: z.number().min(1, "Please rate transparency").max(5),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment must not exceed 500 characters"),
  evidence: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

type RatingFormData = z.infer<typeof ratingSchema>

interface RatingFormProps {
  official: Official
  onSuccess?: () => void
  trigger?: React.ReactNode
}

export function RatingForm({ official, onSuccess, trigger }: RatingFormProps) {
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const { mutate: rateOfficial, isPending } = useRateOfficial()

  const form = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      integrity: 0,
      responsiveness: 0,
      effectiveness: 0,
      transparency: 0,
      comment: "",
      evidence: undefined,
    },
  })

  const watchedValues = form.watch(["integrity", "responsiveness", "effectiveness", "transparency"])

  const onSubmit = (data: RatingFormData) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to rate officials")
      return
    }

    rateOfficial(
      {
        officialId: official._id,
        rating: data,
      },
      {
        onSuccess: () => {
          toast.success("Rating submitted successfully!")
          setOpen(false)
          form.reset()
          onSuccess?.()
        },
        onError: (error) => {
          console.error("Rating error:", error)
          toast.error(error.message || "Failed to submit rating. Please try again.")
        },
      }
    )
  }

  const calculateOverall = () => {
    const [integrity, responsiveness, effectiveness, transparency] = watchedValues
    const validRatings = [integrity, responsiveness, effectiveness, transparency].filter(
      (r) => r > 0
    )

    if (validRatings.length === 0) return "0.0"

    const sum = validRatings.reduce((acc, rating) => acc + rating, 0)
    return (sum / 4).toFixed(1)
  }

  const getRatingLabel = (value: number) => {
    const labels = {
      0: "Not rated",
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    }
    return labels[value as keyof typeof labels] || "Select"
  }

  const getRatingColor = (value: number) => {
    if (value === 0) return "text-muted-foreground"
    if (value <= 2) return "text-red-600"
    if (value <= 3) return "text-yellow-600"
    return "text-green-600"
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Rate {official.name}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Sign In Required
            </DialogTitle>
            <DialogDescription>
              You need to be signed in to rate officials and contribute to democratic
              accountability.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button asChild className="w-full">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} className="w-full">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
        if (!value) {
          form.reset()
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Star className="h-4 w-4 mr-2" />
            Rate {official.name}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-screen sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rate {official.name}</DialogTitle>
          <DialogDescription>
            Provide your assessment of this official's performance. Your feedback helps improve
            transparency and accountability in governance.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating Dimensions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(["integrity", "responsiveness", "effectiveness", "transparency"] as const).map(
                (field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: formField }) => (
                      <FormItem className="space-y-3">
                        <div className="flex justify-between items-center">
                          <FormLabel className="capitalize text-base font-medium">
                            {field}
                          </FormLabel>
                          <Badge variant="outline" className={getRatingColor(formField.value)}>
                            {getRatingLabel(formField.value)}
                          </Badge>
                        </div>

                        <FormControl>
                          <div className="flex justify-center">
                            <RatingInput
                              rating={formField.value}
                              onRatingChange={(value) => formField.onChange(value)}
                              size={24}
                              className="justify-center"
                            />
                          </div>
                        </FormControl>

                        <FormDescription className="text-xs text-center">
                          {field === "integrity" &&
                            "Honesty, ethical conduct, consistency between words and actions"}
                          {field === "responsiveness" &&
                            "Communication with citizens and addressing concerns"}
                          {field === "effectiveness" &&
                            "Ability to achieve objectives and deliver results"}
                          {field === "transparency" &&
                            "Openness about decisions and public information"}
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
            </div>

            {/* Overall Rating Display */}
            <div className="bg-muted/30 rounded-lg p-6 text-center border">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Overall Rating</h4>
              <div className="text-3xl font-bold text-primary">{calculateOverall()}/5</div>
              <p className="text-xs text-muted-foreground mt-1">Based on your individual ratings</p>
            </div>

            {/* Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with specific examples of this official's performance. What actions or policies influenced your rating?"
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>Provide specific examples to support your rating</span>
                    <span
                      className={
                        field.value.length > 450 ? "text-amber-600" : "text-muted-foreground"
                      }
                    >
                      {field.value.length}/500
                    </span>
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
                  <FormLabel className="text-base font-medium">
                    Supporting Evidence (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/news-article-or-official-statement"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to credible sources that support your rating (news articles, official
                    statements, voting records, etc.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Actions */}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || calculateOverall() === "0.0"}>
                {isPending ? "Submitting..." : "Submit Rating"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
