import { BadgeCheck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RepresentativeCardProps {
  rep: {
    id: number;
    name: string;
    position: string;
    constituency: string;
    party: string;
    rating: number;
    verified: boolean;
    imageUrl: string;
  };
}

export function RepresentativeCard({ rep }: RepresentativeCardProps) {
  // Default image if none provided
  const profileImage = rep.imageUrl || "/api/placeholder/400/320";

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {/* Large Image Section */}
      <div className="relative h-48 bg-muted">
        <img
          src={profileImage}
          alt={rep.name}
          className="w-full h-full object-cover"
        />

        {/* Verified Badge */}
        {rep.verified && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
            <BadgeCheck className="h-4 w-4" />
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-0 translate-y-1/2 right-2 bg-card border shadow-sm rounded-full text-sm font-semibold p-2">
          {rep.rating}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-bold text-xl">{rep.name}</h3>

          <p className="text-muted-foreground">{rep.position}</p>

          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{rep.constituency}</span>
          </div>

          <Badge variant={"outline"} className="mt-1">
            {rep.party}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
