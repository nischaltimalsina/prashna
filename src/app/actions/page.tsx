import Link from "next/link";
import { Filter, SearchIcon, Users, ChevronRight, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ActionsPage() {
  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      title: "Clean Drinking Water in Solukhumbu",
      description: "Campaign to improve access to clean drinking water in remote villages of Solukhumbu district",
      category: "Infrastructure",
      supporters: 2145,
      goal: 5000,
      creator: "Himali Clean Water Initiative",
      targetOfficials: ["Minister of Water Resources", "Solukhumbu District Representative"],
      updates: 5,
      comments: 87,
      image: "",
      featured: true,
    },
    {
      id: 2,
      title: "Improve Road Safety in Kathmandu",
      description: "Advocacy for better traffic management and road safety measures in the capital city",
      category: "Transportation",
      supporters: 1879,
      goal: 3000,
      creator: "Safe Roads Nepal",
      targetOfficials: ["Minister of Physical Infrastructure", "Kathmandu Mayor"],
      updates: 3,
      comments: 56,
      image: "",
      featured: true,
    },
    {
      id: 3,
      title: "Protect Chitwan Forest Reserve",
      description: "Campaign against illegal logging and encroachment in Chitwan National Park",
      category: "Environment",
      supporters: 3210,
      goal: 4000,
      creator: "Nepal Conservation Alliance",
      targetOfficials: ["Minister of Forests", "Chief Warden, Chitwan National Park"],
      updates: 8,
      comments: 112,
      image: "",
      featured: true,
    },
    {
      id: 4,
      title: "Gender Equality in Local Governance",
      description: "Promoting women's representation and participation in local government bodies",
      category: "Social Justice",
      supporters: 1456,
      goal: 2500,
      creator: "Women's Empowerment Coalition",
      targetOfficials: ["Minister of Local Development", "Provincial Governors"],
      updates: 4,
      comments: 62,
      image: "",
      featured: false,
    },
    {
      id: 5,
      title: "Educational Reform Initiative",
      description: "Advocating for curriculum modernization and quality improvements in public schools",
      category: "Education",
      supporters: 1785,
      goal: 3500,
      creator: "Nepal Education Reform Group",
      targetOfficials: ["Minister of Education", "School District Officers"],
      updates: 6,
      comments: 93,
      image: "",
      featured: false,
    },
    {
      id: 6,
      title: "Healthcare Access in Rural Areas",
      description: "Campaign to improve healthcare facilities and medical staff in underserved rural communities",
      category: "Healthcare",
      supporters: 2331,
      goal: 5000,
      creator: "Rural Health Nepal",
      targetOfficials: ["Minister of Health", "District Health Officers"],
      updates: 7,
      comments: 105,
      image: "",
      featured: false,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Take Action</h1>
        <p className="text-muted-foreground mt-2">
          Join collective advocacy campaigns, sign open letters, and make your voice heard on important issues.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8 mb-10">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search campaigns by topic, location, or keyword..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button>
          Start a Campaign
        </Button>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="my">My Campaigns</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Link key={campaign.id} href={`/actions/${campaign.id}`} className="block">
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <Badge>{campaign.category}</Badge>
                        {campaign.featured && <Badge variant="secondary">Featured</Badge>}
                      </div>
                      <CardTitle className="mt-3 line-clamp-2">{campaign.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Supporters</span>
                            <span className="font-medium">{campaign.supporters} of {campaign.goal}</span>
                          </div>
                          <Progress value={(campaign.supporters / campaign.goal) * 100} className="h-2" />
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Created by {campaign.creator}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {campaign.comments}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {campaign.supporters}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.filter(c => c.featured).map((campaign) => (
                <Link key={campaign.id} href={`/actions/${campaign.id}`} className="block">
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <Badge>{campaign.category}</Badge>
                        <Badge variant="secondary">Featured</Badge>
                      </div>
                      <CardTitle className="mt-3 line-clamp-2">{campaign.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Supporters</span>
                            <span className="font-medium">{campaign.supporters} of {campaign.goal}</span>
                          </div>
                          <Progress value={(campaign.supporters / campaign.goal) * 100} className="h-2" />
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Created by {campaign.creator}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {campaign.comments}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {campaign.supporters}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.sort((a, b) => b.supporters - a.supporters).slice(0, 3).map((campaign) => (
                <Link key={campaign.id} href={`/actions/${campaign.id}`} className="block">
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <Badge>{campaign.category}</Badge>
                        {campaign.featured && <Badge variant="secondary">Featured</Badge>}
                      </div>
                      <CardTitle className="mt-3 line-clamp-2">{campaign.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Supporters</span>
                            <span className="font-medium">{campaign.supporters} of {campaign.goal}</span>
                          </div>
                          <Progress value={(campaign.supporters / campaign.goal) * 100} className="h-2" />
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Created by {campaign.creator}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {campaign.comments}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {campaign.supporters}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              You need to sign in to see your recent campaigns
            </div>
          </TabsContent>

          <TabsContent value="my" className="space-y-6">
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              You need to sign in to see your campaigns
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <Separator className="my-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">How Campaigns Work</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-2 mr-3 mt-0.5">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium">Create or Join</h3>
                <p className="text-muted-foreground">Start a campaign on an issue that matters to you or join an existing one.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-2 mr-3 mt-0.5">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium">Gather Support</h3>
                <p className="text-muted-foreground">Share with your community and gather endorsements from other citizens.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-2 mr-3 mt-0.5">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium">Official Engagement</h3>
                <p className="text-muted-foreground">Connect with elected officials who can address the issue.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 rounded-full p-2 mr-3 mt-0.5">
                <span className="font-bold">4</span>
              </div>
              <div>
                <h3 className="font-medium">Track Progress</h3>
                <p className="text-muted-foreground">Monitor responses and actions taken by representatives.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Campaign Success Stories</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium">Bhaktapur Heritage Preservation</h3>
                <p className="text-sm text-muted-foreground mt-2">Started with 50 supporters, reached 3,500 and resulted in new heritage protection laws.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium">Rural Internet Access Initiative</h3>
                <p className="text-sm text-muted-foreground mt-2">Campaign led to expanded internet infrastructure in 15 remote villages.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium">Women's Safety in Public Transport</h3>
                <p className="text-sm text-muted-foreground mt-2">Achieved implementation of safety measures in public transportation across major cities.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
