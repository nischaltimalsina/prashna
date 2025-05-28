import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const LEARNING_POINTS = 135;

const modules = [
  {
    id: "constitution",
    name: "Nepal’s Constitution",
    description: "Principles, structures, and citizens’ rights under the 2015 Constitution.",
    completed: true,
  },
  {
    id: "laws",
    name: "Key Laws",
    description: "Explore major laws like the Right to Information Act and Anti-Corruption Act.",
    completed: false,
  },
  {
    id: "rights",
    name: "Fundamental Rights",
    description: "Voting, speech, and responsibilities for all citizens.",
    completed: false,
  },
];

const microLessons = [
  {
    id: "rti-basics",
    title: "Using the Right to Information",
    points: 5,
  },
  {
    id: "parliament-structure",
    title: "How Nepal’s Parliament Works",
    points: 5,
  },
  {
    id: "petition-guide",
    title: "How to File a Petition",
    points: 5,
  },
];

const quizzes = [
  {
    id: "const-quiz",
    title: "Constitution Module Quiz",
    completed: true,
    score: 90,
  },
  {
    id: "rti-quiz",
    title: "Rights Module Quiz",
    completed: false,
    score: null,
  },
];

export default function LearningHub() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl">
          Civic Learning Hub
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Micro-lessons, quizzes, and resources to boost your civic knowledge—earn badges and points as you learn!
        </p>
        <Badge className="mt-4">Learning Points: <span className="font-bold ml-1">{LEARNING_POINTS}</span></Badge>
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge variant="secondary">Learning Streak: 8 days</Badge>
          <Badge variant="secondary">Quiz Master</Badge>
          <Badge variant="secondary">Constitution Expert</Badge>
        </div>
        <Button asChild className="mt-5" size="lg">
          <Link href="#modules">Start Learning</Link>
        </Button>
      </div>
      <section id="modules" className="mb-12">
        <h2 className="font-semibold text-xl mb-4">Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Card key={mod.id} className={mod.completed ? "border-emerald-600" : ""}>
              <CardHeader>
                <CardTitle>{mod.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">{mod.description}</p>
                <div className="flex items-center gap-2">
                  <Progress value={mod.completed ? 100 : 60} className="h-2 w-1/2" />
                  <span className="text-xs text-muted-foreground">{mod.completed ? "Completed" : "In Progress"}</span>
                </div>
                <Button asChild size="sm" className="mt-4">
                  <Link href={`/learning/modules/${mod.id}`}>{mod.completed ? "Review" : "Continue"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="font-semibold text-xl mb-4">Micro-Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {microLessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">+{lesson.points} pts</Badge>
                <Button asChild size="sm" className="mt-4">
                  <Link href={`/learning/micro/${lesson.id}`}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="font-semibold text-xl mb-4">Quiz Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Progress value={quiz.completed ? 100 : 40} className="h-2 w-1/2" />
                  <span className="text-xs text-muted-foreground">{quiz.completed ? `Score: ${quiz.score}%` : "Not Attempted"}</span>
                </div>
                <Button asChild size="sm">
                  <Link href={`/learning/quizzes/${quiz.id}`}>{quiz.completed ? "Retake Quiz" : "Start Quiz"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="font-semibold text-xl mb-4">FAQ</h2>
        <div className="grid gap-3">
          <Card>
            <CardHeader>
              <CardTitle>How do I earn Learning Points?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Points are earned by completing micro-lessons, quizzes, modules, and sharing resources. Bonus streak points for continuous learning!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What badges/levels can I earn?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Learning badges like "Quiz Master", "Constitution Expert", and level up from Learner to Civic Sage by engaging and scoring well on civic knowledge tasks.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
