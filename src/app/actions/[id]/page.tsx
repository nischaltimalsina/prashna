import Link from "next/link";
import { ArrowLeft, Users, ThumbsUp, MessageCircle, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  params: { id: string }
}

// Generate static paths for the action campaigns
export async function generateStaticParams() {
  // For a real app, these would come from an API or database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default function ActionDetail({ params }: Props) {
  const id = Number(params.id);

  // Mock data for the selected campaign
  const campaign = {
    id: 1,
    title: "Clean Drinking Water in Solukhumbu",
    description:
      "Campaign to improve access to clean drinking water in remote villages of Solukhumbu district. The region faces significant challenges with water infrastructure, affecting thousands of residents across multiple villages.",
    category: "Infrastructure",
    supportersCount: 2145,
    goal: 5000,
    creator: "Himali Clean Water Initiative",
    targetOfficials: ["Minister of Water Resources", "Solukhumbu District Representative"],
    commentsCount: 87,
    image: "",
    featured: true,
    dateCreated: "March 12, 2025",
    status: "Active",
    background:
      "The mountainous region of Solukhumbu has limited access to clean drinking water, with many villages relying on contaminated sources. This has led to health issues and disproportionately affects women and children who often bear the responsibility of water collection.",
    objectives: [
      "Install water purification systems in 15 villages",
      "Repair existing water infrastructure damaged by landslides",
      "Train local maintenance committees in each village",
      "Advocate for increased government funding for water projects",
    ],
    updatesLog: [
      {
        id: 1,
        date: "April 15, 2025",
        title: "First village installation complete",
        content: "The water purification system in Namche village is now operational, serving 250 households.",
      },
      {
        id: 2,
        date: "April 2, 2025",
        title: "Meeting with officials",
        content: "Representatives met with the Minister of Water Resources who committed to reviewing our proposal.",
      },
      {
        id: 3,
        date: "March 25, 2025",
        title: "Equipment delivered",
        content: "Purification equipment has arrived in the region and is ready for installation.",
      },
    ],
    supportersList: [
      { name: "Pemba S.", date: "April 16, 2025", comment: "This initiative is long overdue. Thank you for taking action." },
      { name: "Maya L.", date: "April 10, 2025", comment: "My village will benefit greatly from this project." },
      { name: "Raj T.", date: "April 5, 2025", comment: "Happy to support this critical infrastructure need." },
    ],
  };

  return (
    <div className="px-4 py-8">
      <Link href="/actions" className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to campaigns
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Badge>{campaign.category}</Badge>
            <Badge variant="outline" className="font-normal">{campaign.status}</Badge>
          </div>

          <h1 className="text-3xl font-bold mt-4">{campaign.title}</h1>

          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <span>Started on {campaign.dateCreated}</span>
            <span className="mx-2">•</span>
            <span>By {campaign.creator}</span>
          </div>

          <p className="mt-6 text-muted-foreground">{campaign.description}</p>

          <div className="mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">{campaign.supportersCount} supporters</span>
              <span className="text-muted-foreground">Goal: {campaign.goal}</span>
            </div>
            <Progress value={(campaign.supportersCount / campaign.goal) * 100} className="h-2.5" />
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button className="gap-2">
              <ThumbsUp className="h-4 w-4" />
              Support This Campaign
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-xl font-bold mb-4">Background</h2>
              <p className="text-muted-foreground">{campaign.background}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Objectives</h2>
              <ul className="space-y-2">
                {campaign.objectives.map((objective, i) => (
                  <li key={`objective-${i}`} className="flex gap-2">
                    <div className="bg-primary/10 rounded-full p-1 h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-medium">{i + 1}</span>
                    </div>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Target Officials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {campaign.targetOfficials.map((official, i) => (
                  <Card key={`official-${i}`}>
                    <CardContent className="pt-6">
                      <div className="font-medium">{official}</div>
                      <Button variant="link" className="p-0 h-auto text-sm">View Profile</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Recent Updates</h2>
              <div className="space-y-4">
                {campaign.updatesLog.map((update) => (
                  <Card key={update.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{update.title}</CardTitle>
                        <Badge variant="outline" className="font-normal">{update.date}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{update.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Supporters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {campaign.supportersList.map((supporter, i) => (
                    <div key={`supporter-${i}`} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {supporter.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex justify-between">
                          <div className="font-medium text-sm">{supporter.name}</div>
                          <div className="text-xs text-muted-foreground">{supporter.date}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{supporter.comment}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full">See All Supporters</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Supporters</span>
                      <span className="font-medium">{campaign.supportersCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Comments</span>
                      <span className="font-medium">{campaign.commentsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updates</span>
                      <span className="font-medium">{campaign.updatesLog.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round((campaign.supportersCount / campaign.goal) * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Share This Campaign</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Share on Twitter
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Share on Facebook
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 110-3.096 1.548 1.548 0 010 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
                    </svg>
                    Share on LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.425 14.2l2.425 2.425-2.65 2.65-2.575-2.575v-.017L19.425 14.2zm-13.8-8.9l4.075 4.075 2.5-2.5L8.125 2.8 5.625 5.3zm7.018 7.018l-1.59 1.608 6.583 6.592L21 17.043l-8.357-8.358V8.668l-.393.042-.917.1-.3.3-.8.8v.425z" />
                      <path d="M4.929 7.833L.737 12.033l8.33 8.33 4.2-4.2-8.33-8.33zm-2.543 4.2l2.543-2.543 6.25 6.25-2.543 2.543-6.25-6.25z" />
                    </svg>
                    Share via Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
