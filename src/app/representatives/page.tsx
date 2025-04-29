import Link from "next/link";
import { BadgeCheck, Filter, MapPin, SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function RepresentativesPage() {
  // Mock data for representatives
  const representatives = [
    {
      id: 1,
      name: "Asha Sharma",
      position: "Member of Parliament",
      constituency: "Kathmandu-3",
      party: "Nepal Democratic Party",
      rating: 4.8,
      verified: true,
      imageUrl: "",
    },
    {
      id: 2,
      name: "Raj Thapa",
      position: "Provincial Assembly Member",
      constituency: "Gandaki-5",
      party: "Progressive Alliance",
      rating: 4.7,
      verified: true,
      imageUrl: "",
    },
    {
      id: 3,
      name: "Meena Lama",
      position: "Mayor",
      constituency: "Pokhara Metropolitan City",
      party: "United People's Front",
      rating: 4.6,
      verified: true,
      imageUrl: "",
    },
    {
      id: 4,
      name: "Kumar Pradhan",
      position: "Member of Parliament",
      constituency: "Jhapa-2",
      party: "Nepal Workers Party",
      rating: 4.3,
      verified: false,
      imageUrl: "",
    },
    {
      id: 5,
      name: "Sunita Gurung",
      position: "Ward Chairperson",
      constituency: "Lalitpur-4",
      party: "Citizen's Coalition",
      rating: 4.5,
      verified: true,
      imageUrl: "",
    },
    {
      id: 6,
      name: "Deepak Shrestha",
      position: "Provincial Assembly Member",
      constituency: "Bagmati-7",
      party: "Progressive Alliance",
      rating: 4.1,
      verified: true,
      imageUrl: "",
    },
  ];

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Find Representatives</h1>
        <p className="text-muted-foreground mt-2">
          Search and connect with your elected officials to view their profiles, ratings, and engage with them.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8 mb-10">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, location, or issue..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {representatives.map((rep) => (
            <Link key={rep.id} href={`/representatives/${rep.id}`} className="block">
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={rep.imageUrl} alt={rep.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {rep.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{rep.name}</h3>
                        {rep.verified && (
                          <BadgeCheck className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{rep.position}</p>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{rep.constituency}</span>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {rep.party}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 flex justify-between">
                  <div className="text-sm">
                    <span className="font-medium">{rep.rating}</span>
                    <span className="text-muted-foreground">/5 Rating</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
