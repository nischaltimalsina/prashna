import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Users, Shield, LineChart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] space-y-12 py-8">
      {/* Hero Section */}
      <section className="px-4 flex flex-col items-center text-center py-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl">
          PledgePoint: Empowering Citizens, Strengthening Democracy
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-[600px]">
          A digital platform that enables Nepali citizens to rate, review, and engage with their elected officials for a more transparent democracy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button size="lg" asChild>
            <Link href="/representatives">Find Your Representatives</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 bg-muted/40 rounded-lg">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">How PledgePoint Works</h2>
          <p className="mt-4 text-muted-foreground max-w-[600px]">
            Creating transparency and accountability in Nepal's democratic system
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Find Representatives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Search for your elected officials by name, location, or relevant issues
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>View Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access comprehensive information including performance data and current ratings
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rate & Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Evaluate officials on integrity, responsiveness, effectiveness, and transparency
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Take Action</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sign campaigns, participate in open letters, and join moderated discussions
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Content */}
      <section className="px-4 py-12">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">Engage with Democracy</h2>
          <p className="mt-4 text-muted-foreground max-w-[600px]">
            Explore the latest ratings, discussions, and campaigns
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Rated Representatives</CardTitle>
              <CardDescription>Based on citizen reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Asha Sharma</span>
                  <span className="text-primary">4.8/5</span>
                </li>
                <li className="flex justify-between">
                  <span>Raj Thapa</span>
                  <span className="text-primary">4.7/5</span>
                </li>
                <li className="flex justify-between">
                  <span>Meena Lama</span>
                  <span className="text-primary">4.6/5</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/representatives" className="text-sm text-primary hover:underline">
                View all representatives →
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Join collective advocacy efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Clean Drinking Water in Solukhumbu</span>
                  <span className="text-primary">2,145 supporters</span>
                </li>
                <li className="flex justify-between">
                  <span>Improve Road Safety in Kathmandu</span>
                  <span className="text-primary">1,879 supporters</span>
                </li>
                <li className="flex justify-between">
                  <span>Protect Chitwan Forest Reserve</span>
                  <span className="text-primary">3,210 supporters</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/actions" className="text-sm text-primary hover:underline">
                View all campaigns →
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Trending Discussions</CardTitle>
              <CardDescription>Join the conversation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Election Reform Proposal</span>
                  <span className="text-primary">87 comments</span>
                </li>
                <li className="flex justify-between">
                  <span>Healthcare Access in Rural Areas</span>
                  <span className="text-primary">64 comments</span>
                </li>
                <li className="flex justify-between">
                  <span>Educational Policy Changes</span>
                  <span className="text-primary">43 comments</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/discussions" className="text-sm text-primary hover:underline">
                View all discussions →
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 bg-primary text-primary-foreground rounded-lg">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">Join PledgePoint Today</h2>
          <p className="text-primary-foreground/80 max-w-[600px]">
            Be part of the movement to strengthen Nepal's democracy through citizen engagement
          </p>
          <Button variant="secondary" size="lg" className="mt-4" asChild>
            <Link href="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
