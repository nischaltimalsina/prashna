"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const promises = [
  { id: 1, official: "Asha Sharma", text: "Pave 10km of rural roads", status: "Kept", contributors: ["Meena L."], evidence: 5 },
  { id: 2, official: "Raj Thapa", text: "Increase education funding 20%", status: "In Progress", contributors: ["Suresh T.", "Anonymous 38"], evidence: 3 },
  { id: 3, official: "Meena Lama", text: "Build community health post", status: "Broken", contributors: ["N.T.", "Anonymous 48"], evidence: 4 },
];
const leaderboard = [
  { name: "Meena L.", evidence: 7, badges: ["Data Contributor"] },
  { name: "Anonymous 38", evidence: 5, badges: ["Promise Tracker"] },
  { name: "Suresh T.", evidence: 4, badges: ["Truth Verifier"] },
];

export default function PromiseDashboard() {
  const [showValidate, setShowValidate] = useState(false);
  const [selected, setSelected] = useState(null as null | typeof promises[0]);
  return (
    <div className="container px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold mb-8">Promise Fulfillment Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {promises.map(p => (
          <Card key={p.id}>
            <CardHeader><CardTitle>{p.text}</CardTitle></CardHeader>
            <CardContent>
              <div className="mb-2 flex gap-2"><Badge variant="outline">{p.official}</Badge><Badge>{p.status}</Badge></div>
              <div className="mb-2 text-sm">Evidence submitted: <span className="font-bold">{p.evidence}</span></div>
              <div className="mb-2 text-xs">Contributors: {p.contributors.join(", ")}</div>
              <Button size="sm" onClick={() => { setSelected(p); setShowValidate(true); }}>Validate Evidence</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-5 mt-10">Top Promise Evidence Contributors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {leaderboard.map(l => (
          <Card key={l.name}>
            <CardHeader><CardTitle>{l.name}</CardTitle></CardHeader>
            <CardContent>
              <div className="mb-2">Evidence: <span className="font-bold">{l.evidence}</span></div>
              <div className="flex flex-wrap gap-2">{l.badges.map(b => <Badge key={b}>{b}</Badge>)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Validator Modal */}
      {showValidate && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-7 rounded-lg min-w-[300px] max-w-[95vw] shadow-lg">
            <h2 className="font-bold mb-3">Validate Evidence for: <span className="text-primary">{selected.text}</span></h2>
            <div className="mb-4 text-xs">Evidence goes here... simulated for demo.</div>
            <Button className="mr-2" onClick={() => { setShowValidate(false); }}>Approve (+30 pts, badge!)</Button>
            <Button variant="destructive" onClick={() => { setShowValidate(false); }}>Reject (-10 pts)</Button>
          </div>
        </div>
      )}
    </div>
  );
}
