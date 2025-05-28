"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const aiQueue = [
  { id: 1, type: "Evidence", content: "This official kept their road safety promise.", flagged: "toxicity", confidence: 0.90 },
  { id: 2, type: "Discussion Post", content: "All politicians are liars!", flagged: "toxicity", confidence: 0.93 },
];
const communityQueue = [
  { id: 3, type: "Review", content: "This mayor broke her education promise.", flags: 4 },
  { id: 4, type: "Campaign", content: "Join our protest outside parliament!", flags: 10 },
];
const reviewLog = [
  { id: 1, type: "Review", action: "Removed", by: "Moderator", date: "2025-05-01" },
  { id: 2, type: "Evidence", action: "Validated", by: "Expert", date: "2025-05-01" },
];

export default function ModerationDashboard() {
  const [ai, setAi] = useState(aiQueue);
  const [comm, setComm] = useState(communityQueue);
  const [log, setLog] = useState(reviewLog);

  return (
    <div className="container px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold mb-8">Moderation Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader><CardTitle>AI Auto-Flagged Queue</CardTitle></CardHeader>
          <CardContent>
            {ai.length === 0 && <p className="text-muted-foreground">No items.</p>}
            {ai.map(item => (
              <div key={item.id} className="border-b py-3">
                <div className="font-semibold">[{item.type}]</div>
                <div className="mb-2">{item.content}</div>
                <div className="text-xs mb-2">Flag: {item.flagged}, confidence={item.confidence}</div>
                <div className="flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="destructive">Reject</Button>
                  <Button size="sm" variant="outline">Escalate</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Community Queue</CardTitle></CardHeader>
          <CardContent>
            {comm.length === 0 && <p className="text-muted-foreground">No items.</p>}
            {comm.map(item => (
              <div key={item.id} className="border-b py-3">
                <div className="font-semibold">[{item.type}]</div>
                <div className="mb-2">{item.content}</div>
                <div className="text-xs mb-2">Flags: {item.flags}</div>
                <div className="flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="destructive">Reject</Button>
                  <Button size="sm" variant="outline">Escalate</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="mb-8">
        <CardHeader><CardTitle>Human Review Log</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-xs">
            <thead>
              <tr><th>ID</th><th>Type</th><th>Action</th><th>By</th><th>Date</th></tr>
            </thead>
            <tbody>
            {log.map(item => (
              <tr key={item.id} className="border-b">
                <td>{item.id}</td><td>{item.type}</td><td>{item.action}</td><td>{item.by}</td><td>{item.date}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
