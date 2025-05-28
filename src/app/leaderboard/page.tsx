"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const users = [
  { id: 1, name: "Anonymous 92", points: 1750, badges: ["Leaderboard Star", "Civic Mentor"], region: "Kathmandu", scholar: true },
  { id: 2, name: "N.T.", points: 1625, badges: ["Constitution Expert"], region: "Pokhara", scholar: false },
  { id: 3, name: "Anonymous 38", points: 1535, badges: ["Quiz Master"], region: "Lalitpur", scholar: true },
  { id: 4, name: "Meena L.", points: 1510, badges: ["Rights Defender"], region: "Biratnagar", scholar: false },
  { id: 5, name: "Anonymous 48", points: 1510, badges: ["Learning Streak"], region: "Janakpur", scholar: true },
  { id: 6, name: "Suresh T.", points: 1475, badges: ["Campaign Catalyst"], region: "Butwal", scholar: false },
];

const regions = [
  { name: "Kathmandu", points: 6800 },
  { name: "Pokhara", points: 5750 },
  { name: "Biratnagar", points: 5400 },
  { name: "Lalitpur", points: 4900 },
  { name: "Janakpur", points: 4410 },
];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("week");
  const periods = { week: "This Week", month: "This Month", all: "All-Time" };
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Leaderboard</h1>
        <p className="text-muted-foreground mt-3 max-w-xl">See who’s making the biggest impact—top contributors, learners, and regions. Anonymity options always respected!</p>
        <div className="flex gap-3 mt-5">
          {Object.entries(periods).map(([k, v]) => (
            <Button key={k} variant={period === k ? "default" : "outline"} size="sm" onClick={() => setPeriod(k)}>{v}</Button>
          ))}
        </div>
      </div>
      <Tabs defaultValue="individual" className="mb-12">
        <TabsList>
          <TabsTrigger value="individual">Top Contributors</TabsTrigger>
          <TabsTrigger value="scholars">Civic Scholars</TabsTrigger>
          <TabsTrigger value="regions">Regional Stars</TabsTrigger>
        </TabsList>
        <TabsContent value="individual" className="pt-8">
          <h2 className="font-semibold text-xl mb-4">Individuals (Top 10 earn Leaderboard Star badge)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((u, idx) => (
              <Card key={u.id} className={idx === 0 ? "border-amber-500" : ""}>
                <CardHeader>
                  <CardTitle>{idx === 0 ? <span>🥇</span> : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null} {u.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">Points: <span className="font-bold">{u.points}</span></div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {u.badges.map((b) => <Badge key={b}>{b}</Badge>)}
                  </div>
                  <Badge variant="outline">Region: {u.region}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="scholars" className="pt-8">
          <h2 className="font-semibold text-xl mb-4">Civic Scholars (Learning Points)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.filter(u => u.scholar).map((u, idx) => (
              <Card key={u.id} className={idx === 0 ? "border-emerald-500" : ""}>
                <CardHeader>
                  <CardTitle>{u.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">Learning Points: <span className="font-bold">{u.points}</span></div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {u.badges.map((b) => <Badge key={b}>{b}</Badge>)}
                  </div>
                  <Badge variant="outline">Region: {u.region}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="regions" className="pt-8">
          <h2 className="font-semibold text-xl mb-4">Regional Stars (Total Points by Region)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regions.map((reg, idx) => (
              <Card key={reg.name} className={idx === 0 ? "border-blue-500" : ""}>
                <CardHeader>
                  <CardTitle>{idx === 0 ? "⭐ " : null}{reg.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">Points: <span className="font-bold">{reg.points}</span></div>
                  <Badge variant="outline">Top Region</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader>
          <CardTitle>How Leaderboards Work</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 mb-2 text-sm text-muted-foreground">
            <li>Leaderboards reset weekly/monthly for fresh competition.</li>
            <li>Users can choose to appear as anonymous. No private info is shown.</li>
            <li>Top contributors earn unique badges and visibility.</li>
            <li>Regional boards motivate collective civic impact.</li>
          </ul>
          <Button asChild className="mt-3" size="sm">
            <a href="/about">Learn More About Badges</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
