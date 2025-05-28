import { Badge } from "@/components/ui/badge";

export default function UserProfilePoints({ user }: { user: { name: string; points: number; streak: number; credibility: number; badges: string[] } }) {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <div>
          <div className="font-bold text-lg">{user.name}</div>
          <div className="text-muted-foreground text-xs mt-1">Level: {user.points >= 501 ? "Leader" : user.points >= 101 ? "Advocate" : "Citizen"}</div>
        </div>
        <div>
          <span className="font-semibold">Points: {user.points}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {user.badges.map((b) => <Badge key={b}>{b}</Badge>)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mt-3">
        <span className="rounded bg-emerald-100 dark:bg-emerald-800 p-2 text-emerald-700 dark:text-emerald-200">Streak: {user.streak}d</span>
        <span className="rounded bg-blue-100 dark:bg-blue-800 p-2 text-blue-700 dark:text-blue-200">Credibility: {user.credibility}</span>
      </div>
    </div>
  );
}
