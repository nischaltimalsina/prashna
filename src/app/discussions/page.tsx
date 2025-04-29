import Link from "next/link";
import { SearchIcon, Filter, MessageCircle, Eye, ThumbsUp, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function DiscussionsPage() {
  // Mock data for discussions
  const discussions = [
    {
      id: 1,
      title: "Election Reform Proposal",
      description: "Discussion about the proposed changes to Nepal's electoral system and potential impacts on representation.",
      category: "Electoral Systems",
      author: "Ankit Sharma",
      authorRole: "Political Scientist",
      date: "April 15, 2025",
      comments: 87,
      views: 432,
      likes: 156,
      featured: true,
      tags: ["Electoral Reform", "Voting Rights", "Parliament"],
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      title: "Healthcare Access in Rural Areas",
      description: "Discussing solutions to improve healthcare infrastructure and service delivery in remote regions of Nepal.",
      category: "Healthcare",
      author: "Nirmala Thapa",
      authorRole: "Public Health Advocate",
      date: "April 12, 2025",
      comments: 64,
      views: 286,
      likes: 108,
      featured: false,
      tags: ["Healthcare", "Rural Development", "Public Services"],
      lastActivity: "5 hours ago",
    },
    {
      id: 3,
      title: "Educational Policy Changes",
      description: "Analyzing recent amendments to educational policies and their potential impact on schools across the country.",
      category: "Education",
      author: "Rajesh Lamichhane",
      authorRole: "Education Advocate",
      date: "April 10, 2025",
      comments: 43,
      views: 175,
      likes: 67,
      featured: true,
      tags: ["Education", "Policy", "Schools"],
      lastActivity: "1 day ago",
    },
    {
      id: 4,
      title: "Water Conservation Initiatives",
      description: "Discussing community-led water conservation projects and government support mechanisms in drought-prone areas.",
      category: "Environment",
      author: "Maya Gurung",
      authorRole: "Environmental Activist",
      date: "April 8, 2025",
      comments: 38,
      views: 192,
      likes: 86,
      featured: false,
      tags: ["Water Resources", "Environment", "Conservation"],
      lastActivity: "2 days ago",
    },
    {
      id: 5,
      title: "Infrastructure Development Priorities",
      description: "Debate on which infrastructure projects should be prioritized in the upcoming fiscal year's budget allocation.",
      category: "Infrastructure",
      author: "Binod Khadka",
      authorRole: "Urban Planner",
      date: "April 5, 2025",
      comments: 76,
      views: 347,
      likes: 124,
      featured: false,
      tags: ["Budget", "Infrastructure", "Development"],
      lastActivity: "6 hours ago",
    },
    {
      id: 6,
      title: "Women's Representation in Local Government",
      description: "Analyzing the progress and challenges in implementing quotas for women in local government bodies.",
      category: "Gender Equality",
      author: "Sarita Poudel",
      authorRole: "Gender Rights Activist",
      date: "April 2, 2025",
      comments: 58,
      views: 263,
      likes: 98,
      featured: true,
      tags: ["Gender Equality", "Local Government", "Representation"],
      lastActivity: "10 hours ago",
    },
  ];

  // Featured topics (categories with most discussions)
  const featuredTopics = [
    { name: "Electoral Reform", count: 24 },
    { name: "Education", count: 18 },
    { name: "Healthcare", count: 15 },
    { name: "Infrastructure", count: 12 },
    { name: "Environment", count: 10 },
    { name: "Local Governance", count: 9 },
  ];

  // Active users in discussions
  const activeUsers = [
    { name: "Ankit S.", role: "Political Scientist", discussionsStarted: 12, comments: 87 },
    { name: "Nirmala T.", role: "Public Health Advocate", discussionsStarted: 8, comments: 64 },
    { name: "Rajesh L.", role: "Education Advocate", discussionsStarted: 6, comments: 43 },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Discussions</h1>
        <p className="text-muted-foreground mt-2">
          Join conversations on important issues, share your perspectives, and engage with fellow citizens and experts.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8 mb-10">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search discussions by topic, author, or keyword..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button>
          Start a Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All Discussions</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="my">My Discussions</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="all" className="space-y-6">
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Link key={discussion.id} href={`/discussions/${discussion.id}`} className="block">
                      <Card className="transition-all hover:shadow-md">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle>{discussion.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{discussion.description}</CardDescription>
                            </div>
                            {discussion.featured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="outline">{discussion.category}</Badge>
                            {discussion.tags.slice(0, 2).map((tag, i) => (
                              <Badge key={`tag-${i}`} variant="outline" className="bg-muted/50">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {discussion.author.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="text-muted-foreground">By </span>
                              <span>{discussion.author}</span>
                            </div>
                            <span className="text-muted-foreground text-sm hidden md:inline">•</span>
                            <span className="text-muted-foreground text-sm hidden md:inline">{discussion.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {discussion.comments}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {discussion.views}
                            </div>
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {discussion.likes}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="space-y-6">
                <div className="space-y-4">
                  {discussions.filter(d => d.featured).map((discussion) => (
                    <Link key={discussion.id} href={`/discussions/${discussion.id}`} className="block">
                      <Card className="transition-all hover:shadow-md">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle>{discussion.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{discussion.description}</CardDescription>
                            </div>
                            <Badge variant="secondary">Featured</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="outline">{discussion.category}</Badge>
                            {discussion.tags.slice(0, 2).map((tag, i) => (
                              <Badge key={`tag-${i}`} variant="outline" className="bg-muted/50">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {discussion.author.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="text-muted-foreground">By </span>
                              <span>{discussion.author}</span>
                            </div>
                            <span className="text-muted-foreground text-sm hidden md:inline">•</span>
                            <span className="text-muted-foreground text-sm hidden md:inline">{discussion.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {discussion.comments}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {discussion.views}
                            </div>
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {discussion.likes}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-6">
                <div className="space-y-4">
                  {discussions.sort((a, b) => b.views - a.views).slice(0, 3).map((discussion) => (
                    <Link key={discussion.id} href={`/discussions/${discussion.id}`} className="block">
                      <Card className="transition-all hover:shadow-md">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle>{discussion.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{discussion.description}</CardDescription>
                            </div>
                            {discussion.featured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="outline">{discussion.category}</Badge>
                            {discussion.tags.slice(0, 2).map((tag, i) => (
                              <Badge key={`tag-${i}`} variant="outline" className="bg-muted/50">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {discussion.author.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="text-muted-foreground">By </span>
                              <span>{discussion.author}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {discussion.comments}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {discussion.views}
                            </div>
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {discussion.likes}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-6">
                <div className="space-y-4">
                  {discussions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3).map((discussion) => (
                    <Link key={discussion.id} href={`/discussions/${discussion.id}`} className="block">
                      <Card className="transition-all hover:shadow-md">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle>{discussion.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{discussion.description}</CardDescription>
                            </div>
                            {discussion.featured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="outline">{discussion.category}</Badge>
                            {discussion.tags.slice(0, 2).map((tag, i) => (
                              <Badge key={`tag-${i}`} variant="outline" className="bg-muted/50">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {discussion.author.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="text-muted-foreground">By </span>
                              <span>{discussion.author}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {discussion.lastActivity}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my" className="space-y-6">
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  You need to sign in to see your discussions
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Featured Topics</CardTitle>
              <CardDescription>Popular discussion categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {featuredTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm">{topic.name}</span>
                  </div>
                  <Badge variant="outline">{topic.count}</Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="ghost" className="w-full flex items-center justify-center gap-1 text-sm">
                View All Topics
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Contributors</CardTitle>
              <CardDescription>Top users in discussions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeUsers.map((user, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.role}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {user.discussionsStarted} discussions • {user.comments} comments
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="ghost" className="w-full flex items-center justify-center gap-1 text-sm">
                View All Contributors
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discussion Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">1. Focus on evidence</p>
                <p className="text-muted-foreground text-xs">Back your arguments with verifiable facts when possible.</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">2. Be respectful</p>
                <p className="text-muted-foreground text-xs">Engage constructively, even when disagreeing with others.</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">3. Stay on topic</p>
                <p className="text-muted-foreground text-xs">Keep conversations relevant to the discussion topic.</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">4. Respect privacy</p>
                <p className="text-muted-foreground text-xs">Don't share private information about officials or other users.</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="ghost" className="w-full flex items-center justify-center gap-1 text-sm">
                Full Community Guidelines
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
