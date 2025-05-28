import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: 1,
    question: "What are the steps to file a Right to Information request in Nepal?",
    user: "Anonymous 82",
    points: 10,
    date: "3 days ago",
    answers: [
      {
        expert: "R. Oli, Legal Expert",
        answer: "Start by identifying the public body, draft your written RTI request in Nepali, submit it physically or by email. The authority has to reply within 15 days, or provide justification otherwise.",
        upvotes: 5,
        badges: ["Top Expert", "Civic Mentor"],
        credibility: 93,
      },
      {
        expert: "A. Shrestha, Civic Journalist",
        answer: "Each RTI request can be tracked via the National Information Commission’s portal. Appeal any nonresponse within 7 days.",
        upvotes: 2,
        badges: [],
        credibility: 80,
      }
    ]
  },
  {
    id: 2,
    question: "Does the Constitution allow recall elections for MPs?",
    user: "Suresh T.",
    points: 10,
    date: "Yesterday",
    answers: [
      {
        expert: "Dr. Meena Lama, Constitutional Scholar",
        answer: "Current Nepalese law does not grant citizens the right to directly recall MPs. However, serious misconduct can be grounds for parliamentary removal with Supreme Court approval.",
        upvotes: 3,
        badges: ["Constitution Expert"],
        credibility: 88,
      }
    ]
  }
];

export default function ExpertForumPage() {
  return (
    <div className="container px-4 py-10 md:py-12">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl">Ask the Experts</h1>
        <p className="mt-2 text-muted-foreground max-w-xl">
          Got civic, legal, or governance questions? Our experts provide verified answers. Earn Credibility and Badges by participating!
        </p>
        <Button asChild className="mt-5" size="lg">
          <Link href="/expert-forum/ask">Ask a Question</Link>
        </Button>
      </div>
      <div className="space-y-8">
        {questions.map((q) => (
          <Card key={q.id} className="mb-6">
            <CardHeader>
              <CardTitle>{q.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-2">
                <Badge variant="outline">Asked by {q.user}</Badge>
                <Badge variant="outline">+{q.points} pts</Badge>
                <Badge variant="outline">{q.date}</Badge>
              </div>
              <div className="space-y-4 mt-2">
                {q.answers.map((a, idx) => (
                  <Card key={idx} className={idx === 0 ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/10" : ""}>
                    <CardContent>
                      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                        <span className="text-primary font-medium mr-3">{a.expert}</span>
                        <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                          {a.badges.map((b) => <Badge key={b}>{b}</Badge>)}
                        </div>
                        <Badge variant="secondary">Credibility: {a.credibility}</Badge>
                      </div>
                      <div className="text-muted-foreground text-sm mt-2 mb-2">{a.answer}</div>
                      <div className="flex gap-3 text-xs">
                        <Badge variant="outline">Upvotes: {a.upvotes}</Badge>
                        <Badge variant="outline">Q&A Badge: {a.badges.join(", ") || "Participant"}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader>
          <CardTitle>How the Expert Forum Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 mb-2 text-sm text-muted-foreground">
            <li>Ask a verified question to earn points and badges.</li>
            <li>Experts are verified; top answers earn extra Impact Points.</li>
            <li>Credibility increases with upvotes and validated answers.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
