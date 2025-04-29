import Link from "next/link";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Flag,
  Eye,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  params: { id: string }
}

// Generate static paths for discussions
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default function DiscussionDetail({ params }: Props) {
  const id = Number(params.id);

  // Mock data for the selected discussion
  const discussion = {
    id: 1,
    title: "Election Reform Proposal",
    description: "Discussion about the proposed changes to Nepal's electoral system and potential impacts on representation.",
    content: `
      <p>The recent proposal to reform Nepal's electoral system has significant implications for our democratic processes and citizen representation.</p>

      <p>The key changes in the proposal include:</p>

      <ul>
        <li>Moving from the current mixed system to a more proportional representation model</li>
        <li>Reducing the threshold for parties to gain seats from 3% to 1.5%</li>
        <li>Introducing ranked-choice voting for direct election candidates</li>
        <li>Creating more stringent campaign finance regulations</li>
      </ul>

      <p>Proponents argue these changes will lead to more inclusive representation, particularly for marginalized communities and smaller political parties. Critics, however, raise concerns about potential government instability and further fragmentation of the political landscape.</p>

      <p>The Constitutional Court is expected to review certain aspects of the proposal before it moves forward to parliamentary voting. This could happen as early as next month.</p>

      <p>What are your thoughts on these proposed changes? Would they lead to better representation or create new challenges?</p>
    `,
    category: "Electoral Systems",
    author: "Ankit Sharma",
    authorTitle: "Political Scientist",
    authorBio: "Researcher focusing on electoral systems and democratic institutions in South Asia",
    date: "April 15, 2025",
    lastUpdated: "April 16, 2025 (edited)",
    views: 432,
    upvotes: 156,
    downvotes: 38,
    featured: true,
    tags: ["Electoral Reform", "Voting Rights", "Parliament"],
    relatedDiscussions: [
      { id: 3, title: "Educational Policy Changes" },
      { id: 6, title: "Women's Representation in Local Government" },
    ],
    comments: [
      {
        id: 1,
        author: "Meena Joshi",
        authorTitle: "Voting Rights Advocate",
        content: "I strongly support lowering the threshold to 1.5%. This would allow more diverse voices to be represented in the parliament, particularly from ethnic minorities and regional interest groups that have been historically marginalized in our politics.",
        date: "April 15, 2025",
        upvotes: 42,
        downvotes: 5,
        replies: [
          {
            id: 2,
            author: "Ramesh Poudel",
            content: "While I see your point about diversity, I'm concerned about governance. Having too many small parties could lead to unstable coalitions that change frequently. We need a balance between representation and government stability.",
            date: "April 15, 2025",
            upvotes: 28,
            downvotes: 8,
          },
          {
            id: 3,
            author: "Ankit Sharma",
            authorTitle: "Original Poster",
            content: "Both points are valid. Research from other countries with PR systems suggests that coalition governments can be stable when political culture supports compromise. The question is whether our political landscape is ready for this.",
            date: "April 15, 2025",
            upvotes: 35,
            downvotes: 2,
          }
        ]
      },
      {
        id: 4,
        author: "Binod Thapa",
        authorTitle: "Former Election Commissioner",
        content: "The ranked-choice voting proposal is particularly interesting. It could reduce vote splitting and ensure that elected representatives have broader support. However, it will require significant voter education, especially in rural areas where literacy rates may be lower.",
        date: "April 16, 2025",
        upvotes: 56,
        downvotes: 3,
        replies: []
      },
      {
        id: 5,
        author: "Sarita Gurung",
        authorTitle: "Constitutional Lawyer",
        content: "I'd like to point out that parts of this proposal may face constitutional challenges. The Supreme Court previously ruled that certain aspects of electoral system design are protected by the constitution and require a 2/3 majority to change, not just a simple majority.",
        date: "April 16, 2025",
        upvotes: 38,
        downvotes: 7,
        replies: []
      }
    ]
  };

  // Function to render HTML content safely
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Link href="/discussions" className="flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to discussions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 flex-wrap mb-2">
                <Badge variant="outline">{discussion.category}</Badge>
                {discussion.tags.map((tag, index) => (
                  <Badge key={`tag-${tag}`} variant="outline" className="bg-muted/50">{tag}</Badge>
                ))}
                {discussion.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold">{discussion.title}</h1>

              <div className="flex items-center gap-4 mt-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {discussion.author.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{discussion.author}</div>
                  <div className="text-muted-foreground text-sm">{discussion.authorTitle}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Posted: {discussion.date}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{discussion.views} views</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{discussion.comments.length} comments</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={createMarkup(discussion.content)} />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                Upvote ({discussion.upvotes})
              </Button>
              <Button variant="outline" className="gap-2">
                <ThumbsDown className="h-4 w-4" />
                Downvote ({discussion.downvotes})
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="icon">
                <Flag className="h-4 w-4" />
              </Button>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-4">Comments ({discussion.comments.length})</h2>

              <div className="mb-8">
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <textarea
                      placeholder="Add your comment..."
                      className="w-full min-h-24 p-3 border rounded"
                    />
                    <div className="flex justify-end mt-4">
                      <Button>Post Comment</Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {discussion.comments.map((comment) => (
                    <Card key={comment.id} className="border border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {comment.author.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between mb-1">
                              <div>
                                <span className="font-medium">{comment.author}</span>
                                {comment.authorTitle && (
                                  <span className="text-sm text-muted-foreground ml-2">
                                    {comment.authorTitle}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {comment.date}
                              </span>
                            </div>
                            <p className="text-sm mb-3">{comment.content}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                {comment.upvotes}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                                <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                                {comment.downvotes}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                                Reply
                              </Button>
                            </div>

                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-6 mt-4 space-y-4">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="border-l-2 pl-4 pt-2">
                                    <div className="flex items-start gap-3">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                          {reply.author.split(" ").map(n => n[0]).join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-baseline justify-between mb-1">
                                          <div>
                                            <span className="font-medium">{reply.author}</span>
                                            {reply.authorTitle && (
                                              <span className="text-xs text-muted-foreground ml-1">
                                                {reply.authorTitle}
                                              </span>
                                            )}
                                          </div>
                                          <span className="text-xs text-muted-foreground">
                                            {reply.date}
                                          </span>
                                        </div>
                                        <p className="text-sm mb-2">{reply.content}</p>
                                        <div className="flex items-center gap-4 text-sm">
                                          <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                            {reply.upvotes}
                                          </Button>
                                          <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                                            <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                                            {reply.downvotes}
                                          </Button>
                                          <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                                            Reply
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About the Author</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {discussion.author.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{discussion.author}</div>
                  <div className="text-sm text-muted-foreground">{discussion.authorTitle}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {discussion.authorBio}
              </p>
              <Button variant="outline" className="w-full">View Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Discussions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {discussion.relatedDiscussions.map((related) => (
                <Link href={`/discussions/${related.id}`} key={related.id} className="block">
                  <Card className="border-border/50 hover:border-border hover:bg-muted/40 transition-colors">
                    <CardContent className="p-3">
                      <p className="font-medium text-sm">{related.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discussion Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">1. Be respectful</p>
                <p className="text-muted-foreground text-xs">
                  Treat others with courtesy, even in disagreement.
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium">2. Focus on facts</p>
                <p className="text-muted-foreground text-xs">
                  Back claims with credible sources when possible.
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium">3. No personal attacks</p>
                <p className="text-muted-foreground text-xs">
                  Focus on ideas, not individuals.
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium">4. Stay on topic</p>
                <p className="text-muted-foreground text-xs">
                  Keep comments relevant to the discussion.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
