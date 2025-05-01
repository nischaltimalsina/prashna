"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  inquiryType: z.string({
    required_error: "Please select an inquiry type.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(1000, {
    message: "Message must not exceed 1000 characters.",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // In a real app, you would send this data to your backend
    console.log("Contact form submission:", values);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    form.reset();
  };

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions or feedback about SajhaSabha? We'd love to hear from you. Use the form below to get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {isSubmitted ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center p-6">
                  <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Message Received!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for contacting us. We've received your message and will respond within 2 business days.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll never share your email with anyone else.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select inquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Question</SelectItem>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="feedback">Platform Feedback</SelectItem>
                              <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                              <SelectItem value="verification">Verification Issue</SelectItem>
                              <SelectItem value="report">Report a Problem</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide details about your inquiry..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            <span className="flex justify-between">
                              <span>Please be as specific as possible.</span>
                              <span className="text-muted-foreground">{field.value.length}/1000</span>
                            </span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-4">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@sajhasabha.com" className="text-sm text-primary hover:underline">
                      info@sajhasabha.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      +977-1-XXXXXXX<br />
                      (Weekdays, 9:00 AM - 5:00 PM NPT)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Civic Tech Nepal<br />
                      Thamel, Kathmandu<br />
                      Nepal
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-4">Response Time</h2>
              <p className="text-sm text-muted-foreground">
                We strive to respond to all inquiries within 2 business days. For urgent matters, please
                call our support line during business hours.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-4">Specific Inquiries</h2>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-medium">Media Inquiries:</span>{" "}
                  <a href="mailto:media@sajhasabha.com" className="text-primary hover:underline">
                    media@sajhasabha.com
                  </a>
                </p>
                <p>
                  <span className="font-medium">Partnership Opportunities:</span>{" "}
                  <a href="mailto:partnerships@sajhasabha.com" className="text-primary hover:underline">
                    partnerships@sajhasabha.com
                  </a>
                </p>
                <p>
                  <span className="font-medium">Technical Support:</span>{" "}
                  <a href="mailto:support@sajhasabha.com" className="text-primary hover:underline">
                    support@sajhasabha.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Find answers to common questions about SajhaSabha in our comprehensive FAQ section.
        </p>
        <Button asChild>
          <Link href="/faq">Visit FAQ</Link>
        </Button>
      </div>
    </div>
  );
}
