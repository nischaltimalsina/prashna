"use client"
import Link from "next/link";
import {
  BadgeCheck,
  ThumbsUp,
  MessageSquare,
  FileText,
  ArrowLeft,
  Share2,
  Flag,
  MapPin,
  Award,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RatingForm } from "@/components/rating/rating-form";
import { toast } from "sonner";

export default function RepresentativeProfile({ id }: {id:string}) {

  // Mock representative data
  const representative = {
    id: id,
    name: "Asha Sharma",
    position: "Member of Parliament",
    constituency: "Kathmandu-3",
    party: "Nepal Democratic Party",
    bio: "Dedicated public servant with over 15 years of experience in governance. Focused on education reform, healthcare access, and environmental protection.",
    ratings: {
      overall: 4.8,
      integrity: 4.7,
      responsiveness: 4.9,
      effectiveness: 4.6,
      transparency: 4.8,
    },
    stats: {
      totalReviews: 128,
      totalActions: 47,
      promises: { kept: 23, inProgress: 8, broken: 4 },
    },
    verified: true,
    contactInfo: {
      email: "asha.sharma@parliament.gov.np",
      phone: "+977-1-4211000",
      office: "Federal Parliament Building, Singha Durbar, Kathmandu",
      socialMedia: {
        twitter: "@AshaSharmaMP",
        facebook: "AshaSharmaOfficial",
      },
    },
    recentActivity: [
      {
        id: 1,
        type: "legislation",
        title: "Co-sponsored the Clean Water Act Amendment",
        date: "April 15, 2025",
      },
      {
        id: 2,
        type: "public_statement",
        title: "Issued statement on educational reform priorities",
        date: "April 8, 2025",
      },
      {
        id: 3,
        type: "committee",
        title: "Chaired meeting of the Environmental Oversight Committee",
        date: "March 29, 2025",
      },
    ],
    committees: [
      "Education and Human Resources Development",
      "Environmental Protection",
      "Women and Social Welfare",
    ],
    imageUrl: "",
  };

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: "Ramesh K.",
      rating: 5,
      comment:
        "Responsive to community concerns. Helped resolve our water supply issues.",
      date: "April 12, 2025",
      dimensions: {
        integrity: 5,
        responsiveness: 5,
        effectiveness: 5,
        transparency: 4,
      },
    },
    {
      id: 2,
      user: "Sita G.",
      rating: 4,
      comment:
        "Good work on education initiatives, but implementation is somewhat slow.",
      date: "April 5, 2025",
      dimensions: {
        integrity: 5,
        responsiveness: 4,
        effectiveness: 3,
        transparency: 5,
      },
    },
    {
      id: 3,
      user: "Binod T.",
      rating: 5,
      comment:
        "Very transparent about policy decisions and always available for meetings.",
      date: "March 22, 2025",
      dimensions: {
        integrity: 5,
        responsiveness: 5,
        effectiveness: 4,
        transparency: 5,
      },
    },
  ];

  const handleRatingSubmitted = () => {
    // In a real app, you would refetch the representative data
    // to get the updated ratings
    console.log("Rating submitted, should refresh data");
    toast.success("Thank you for your rating!");
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-6">
        <Link
          href="/representatives"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to representatives
        </Link>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage
              src={representative.imageUrl}
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
              <span>{representative.constituency}</span>
            </div>

            <p className="mt-4 text-muted-foreground">{representative.bio}</p>

            <div className="flex gap-3 mt-6">
              <RatingForm  politicianId={representative.id}
              politicianName={representative.name}
              onRatingSubmitted={handleRatingSubmitted}/>
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

          <div className="bg-card border rounded-lg p-4 w-full md:w-64 mt-6 md:mt-0">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">
                {representative.ratings.overall}
              </div>
              <div className="text-sm text-muted-foreground">
                Overall Rating
              </div>
              <div className="text-xs mt-1">
                {representative.stats.totalReviews} reviews
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Integrity</span>
                  <span className="font-medium">
                    {representative.ratings.integrity}
                  </span>
                </div>
                <Progress
                  value={representative.ratings.integrity * 20}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Responsiveness</span>
                  <span className="font-medium">
                    {representative.ratings.responsiveness}
                  </span>
                </div>
                <Progress
                  value={representative.ratings.responsiveness * 20}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Effectiveness</span>
                  <span className="font-medium">
                    {representative.ratings.effectiveness}
                  </span>
                </div>
                <Progress
                  value={representative.ratings.effectiveness * 20}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Transparency</span>
                  <span className="font-medium">
                    {representative.ratings.transparency}
                  </span>
                </div>
                <Progress
                  value={representative.ratings.transparency * 20}
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
                      {representative.stats.promises.kept}
                    </div>
                    <div className="text-sm text-muted-foreground">Kept</div>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {representative.stats.promises.inProgress}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      In Progress
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {representative.stats.promises.broken}
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
                    {representative.committees.map((committee, i) => (
                      <li
                        key={`committee-${i}-${committee}`}
                        className="flex items-start"
                      >
                        <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{committee}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {representative.recentActivity.map((activity) => (
                      <li key={activity.id} className="flex items-start">
                        <FileText className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.date}
                          </div>
                        </div>
                      </li>
                    ))}
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
              {reviews.map((review) => (
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
                        <div className="text-muted-foreground">
                          Responsiveness
                        </div>
                        <div className="font-medium">
                          {review.dimensions.responsiveness}/5
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="text-muted-foreground">
                          Effectiveness
                        </div>
                        <div className="font-medium">
                          {review.dimensions.effectiveness}/5
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="text-muted-foreground">
                          Transparency
                        </div>
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
                    <TableRow>
                      <TableCell className="font-medium">
                        Education Reform Act
                      </TableCell>
                      <TableCell>April 10, 2025</TableCell>
                      <TableCell className="text-green-600 dark:text-green-400">
                        For
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Infrastructure Development Fund
                      </TableCell>
                      <TableCell>March 25, 2025</TableCell>
                      <TableCell className="text-green-600 dark:text-green-400">
                        For
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Natural Resources Act Amendment
                      </TableCell>
                      <TableCell>March 15, 2025</TableCell>
                      <TableCell className="text-red-600 dark:text-red-400">
                        Against
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Public Health Emergency Bill
                      </TableCell>
                      <TableCell>February 28, 2025</TableCell>
                      <TableCell className="text-green-600 dark:text-green-400">
                        For
                      </TableCell>
                    </TableRow>
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
                  <li className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        Statement on Educational Reform
                      </div>
                      <Badge variant="outline">April 8, 2025</Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Outlined a five-point plan to improve rural access to
                      quality education throughout the Kathmandu region.
                    </p>
                  </li>
                  <li className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        Press Conference on Infrastructure
                      </div>
                      <Badge variant="outline">March 22, 2025</Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Addressed concerns about road construction delays and
                      announced new oversight measures.
                    </p>
                  </li>
                  <li>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        Joint Statement on Water Conservation
                      </div>
                      <Badge variant="outline">March 10, 2025</Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Co-signed a multi-party statement committing to water
                      protection measures in drought-affected regions.
                    </p>
                  </li>
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
                      href={`mailto:${representative.contactInfo.email}`}
                      className="text-primary hover:underline"
                    >
                      {representative.contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div>{representative.contactInfo.phone}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Office</div>
                    <div>{representative.contactInfo.office}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <Share2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Social Media</div>
                    <div className="flex gap-4 mt-2">
                      <a
                        href="https://twitter.com/"
                        className="text-primary hover:underline"
                      >
                        {representative.contactInfo.socialMedia.twitter}
                      </a>
                      <a
                        href="https://facebook.com/"
                        className="text-primary hover:underline"
                      >
                        {representative.contactInfo.socialMedia.facebook}
                      </a>
                    </div>
                  </div>
                </div>
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
