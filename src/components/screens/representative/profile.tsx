"use client";

import Link from "next/link";
import { useOfficial } from "@/hooks/useOfficials";
import { RatingForm } from "@/components/rating/rating-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  MessageSquare,
  Share2,
  Flag,
  MapPin,
  Award,
  FileText,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import { usePromisesByOfficial } from "@/hooks/usePromises";
import { toast } from "sonner";

export default function RepresentativeProfile({ id }: { id: string }) {
  // Fetch official data
  const { data: officialData, isLoading: officialLoading, error: officialError } = useOfficial(id);

  // Fetch official's promises
  const { data: promisesData, isLoading: promisesLoading } = usePromisesByOfficial(id);

  const handleRatingSubmitted = () => {
    console.log("Rating submitted, data will refresh automatically");
    toast.success("Thank you for your rating!");
  };

  if (officialLoading) {
    return (
      <div className="px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (officialError) {
    return (
      <div className="px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load representative data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const representative = officialData?.data;
  if (!representative) {
    return <div>Representative not found</div>;
  }

  // Calculate promise statistics
  const promises = promisesData?.data || [];
  const promiseStats = {
    kept: promises.filter(p => p.status === 'kept').length,
    inProgress: promises.filter(p => p.status === 'in-progress').length,
    broken: promises.filter(p => p.status === 'broken').length,
  };

  // Mock data for sections not yet in API (you can replace these with actual API calls later)
  const mockReviews = [
    {
      id: 1,
      user: "Ramesh K.",
      rating: 5,
      comment: "Responsive to community concerns. Helped resolve our water supply issues.",
      date: "April 12, 2025",
      dimensions: { integrity: 5, responsiveness: 5, effectiveness: 5, transparency: 4 },
    },
    {
      id: 2,
      user: "Sita G.",
      rating: 4,
      comment: "Good work on education initiatives, but implementation is somewhat slow.",
      date: "April 5, 2025",
      dimensions: { integrity: 5, responsiveness: 4, effectiveness: 3, transparency: 5 },
    },
  ];

  const mockVotingRecord = [
    { bill: "Education Reform Act", date: "April 10, 2025", vote: "For" },
    { bill: "Infrastructure Development Fund", date: "March 25, 2025", vote: "For" },
    { bill: "Natural Resources Act Amendment", date: "March 15, 2025", vote: "Against" },
  ];

  const mockStatements = [
    {
      title: "Statement on Educational Reform",
      date: "April 8, 2025",
      description: "Outlined a five-point plan to improve rural access to quality education.",
    },
    {
      title: "Press Conference on Infrastructure",
      date: "March 22, 2025",
      description: "Addressed concerns about road construction delays and announced new oversight measures.",
    },
  ];

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <Link
          href="/representatives"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to representatives
        </Link>

        {/* Header section with representative info */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage
              src={representative.photo || ""}
              alt={representative.name}
            />
            <AvatarFallback className="text-xl md:text-3xl bg-primary/10 text-primary">
              {representative.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-bold">{representative.name}</h1>
              {representative.verified && (
                <BadgeCheck className="h-5 w-5 text-blue-500" />
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">{representative.position}</Badge>
              <Badge variant="outline">{representative.party}</Badge>
            </div>

            <div className="flex items-center gap-1 mt-3 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{representative.district}</span>
            </div>

            <p className="mt-4 text-muted-foreground">{representative.bio}</p>

            <div className="flex gap-3 mt-6">
              <RatingForm
                official={representative}
                onSuccess={handleRatingSubmitted}
              />
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Rating card with real data */}
          <div className="bg-card border rounded-lg p-4 w-full md:w-64 mt-6 md:mt-0">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">
                {representative.averageRating.overall.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">
                Overall Rating
              </div>
              <div className="text-xs mt-1">
                {representative.totalRatings} reviews
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Integrity</span>
                  <span className="font-medium">
                    {representative.averageRating.integrity.toFixed(1)}
                  </span>
                </div>
                <Progress
                  value={representative.averageRating.integrity * 20}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Responsiveness</span>
                  <span className="font-medium">
                    {representative.averageRating.responsiveness.toFixed(1)}
                  </span>
                </div>
                <Progress
                  value={representative.averageRating.responsiveness * 20}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Effectiveness</span>
                  <span className="font-medium">
                    {representative.averageRating.effectiveness.toFixed(1)}
                  </span>
                </div>
                <Progress
                  value={representative.averageRating.effectiveness * 20}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Transparency</span>
                  <span className="font-medium">
                    {representative.averageRating.transparency.toFixed(1)}
                  </span>
                </div>
                <Progress
                  value={representative.averageRating.transparency * 20}
                  className="h-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-10">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="space-y-8">
            {/* Promise Tracker with real data */}
            <Card>
              <CardHeader>
                <CardTitle>Promise Tracker</CardTitle>
                <CardDescription>
                  Tracking campaign and public promises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {promiseStats.kept}
                    </div>
                    <div className="text-sm text-muted-foreground">Kept</div>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {promiseStats.inProgress}
                    </div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {promiseStats.broken}
                    </div>
                    <div className="text-sm text-muted-foreground">Broken</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Committee Memberships</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                      <li className="text-muted-foreground">No recent activity available</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Citizen Reviews</h3>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-muted-foreground">
                          {review.date}
                        </div>
                      </div>
                      <div className="flex items-center font-medium">
                        <span className="text-lg">{review.rating}</span>
                        <span className="text-muted-foreground">/5</span>
                      </div>
                    </div>

                    <p className="mt-3">{review.comment}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      <div className="text-xs">
                        <div className="text-muted-foreground">Integrity</div>
                        <div className="font-medium">
                          {review.dimensions.integrity}/5
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="text-muted-foreground">Responsiveness</div>
                        <div className="font-medium">
                          {review.dimensions.responsiveness}/5
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="text-muted-foreground">Effectiveness</div>
                        <div className="font-medium">
                          {review.dimensions.effectiveness}/5
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="text-muted-foreground">Transparency</div>
                        <div className="font-medium">
                          {review.dimensions.transparency}/5
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Voting Record</CardTitle>
                <CardDescription>
                  Recent legislative votes and positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bill/Resolution</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Vote</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVotingRecord.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.bill}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell
                          className={
                            record.vote === "For"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        >
                          {record.vote}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Public Statements</CardTitle>
                <CardDescription>
                  Recent press releases and statements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mockStatements.map((statement, index) => (
                    <li key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{statement.title}</div>
                        <Badge variant="outline">{statement.date}</Badge>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {statement.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Official channels to reach the representative
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <LinkIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <a
                      href={`mailto:${representative.contactInfo?.email}`}
                      className="text-primary hover:underline"
                    >
                      {representative.contactInfo?.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div>{representative.contactInfo?.phone || "Contact office for phone number"}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Office</div>
                    <div>{representative.contactInfo?.office}</div>
                  </div>
                </div>

                {representative.contactInfo?.socialMedia && (
                  <div className="flex items-start">
                    <div className="mr-3 p-2 rounded-full bg-primary/10">
                      <Share2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Social Media</div>
                      <div className="flex gap-4 mt-2">
                        {representative.contactInfo.socialMedia.twitter && (
                          <a
                            href="https://twitter.com/"
                            className="text-primary hover:underline"
                          >
                            {representative.contactInfo.socialMedia.twitter}
                          </a>
                        )}
                        {representative.contactInfo.socialMedia.facebook && (
                          <a
                            href="https://facebook.com/"
                            className="text-primary hover:underline"
                          >
                            {representative.contactInfo.socialMedia.facebook}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Your message will be directed to the representative's office
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea className="w-full p-2 border rounded-md h-32" />
                  </div>
                  <Button>Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
