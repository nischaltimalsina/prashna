"use client";

import { RatingInput } from "@/components/rating/rate-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DescriptionList } from "@/components/ui/description-list";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchDistricts } from "@/hooks/useDistricts";
import { useOfficials } from "@/hooks/useOfficials";
import { getAvatarUrl } from "@/lib/utils/avatar";
import { BadgeCheck, Filter, MapPin, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RepresentativesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch officials with filters
  const { data, isLoading, error } = useOfficials({
    page: currentPage,
    limit: 12,
    district: selectedDistrict || undefined,
    sort: "-averageRating.overall",
  });


  if (error) {
    return (
      <div className="px-4 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-destructive mb-4">Failed to load representatives</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Find Representatives</h1>
        <p className="text-muted-foreground mt-2">
          Search and connect with your elected officials to view their profiles, ratings, and engage with them.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8 mb-10">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, location, or issue..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Input
            placeholder="Filter by district..."
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="md:w-48"
          />
          {/* District autocomplete dropdown could go here */}
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data
              ?.filter((rep) =>
                rep.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((rep) => (
                <Link key={rep.id} href={`/representatives/${rep.id}`} className="block">
                  <Card className="h-full transition-all overflow-clip hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="flex isolate flex-col items-start gap-4">
                        <Avatar className="aspect-square relative w-full h-auto rounded-none">
                          <AvatarImage src={rep.photo} alt={rep.name} />
                          <HoverCard closeDelay={200} openDelay={300}>
                            <HoverCardTrigger asChild>
                            <div className="absolute isolate right-2 bottom-2 z-10 px-2 py-1 rounded bg-muted-foreground/40 dark:bg-card/40 hover:shadow-sm duration-300">
                              <RatingInput size={20} className="pointer-events-none" rating={rep.averageRating.overall}/>
                            </div>
                            </HoverCardTrigger>
                            <HoverCardContent align="end" side="top" className="z-50 shadow-sm p-2 w-fit">
                              <div className="flex flex-col gap-1">
                                <div className="grid grid-cols-4 text-xs gap-2">
                                  <div className="col-span-3 whitespace-nowrap">Integrity</div>
                                  <div className="font-medium">
                                    {rep.averageRating.integrity.toFixed(1)}
                                  </div>
                                  <div className="col-span-3 whitespace-nowrap">Responsiveness</div>
                                  <div className="font-medium">
                                    {rep.averageRating.responsiveness.toFixed(1)}
                                  </div>
                                  <div className="col-span-3 whitespace-nowrap">Effectiveness</div>
                                  <div className="font-medium">
                                    {rep.averageRating.effectiveness.toFixed(1)}
                                  </div>
                                  <div className="col-span-3 whitespace-nowrap">Transparency</div>
                                  <div className="font-medium">
                                    {rep.averageRating.transparency.toFixed(1)}
                                  </div>
                                  <div className="col-span-3 text-primary text-sm whitespace-nowrap">Overall Rating</div>
                                  <div className="text-sm font-medium text-primary">
                                    {rep.averageRating.overall.toFixed(1)}
                                  </div>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                          <AvatarFallback className="bg-primary/10 w-full aspect-square rounded-none text-primary">
                            <Image
                              src={getAvatarUrl(rep.gender)}
                              alt={rep.name}
                              className="w-full h-full object-cover dark:invert"
                              width={100}
                              height={100}
                            />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 p-4 pt-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{rep.name}</h3>
                            {rep.verified && (
                              <BadgeCheck className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{rep.position}</p>
                          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{rep.district}</span>
                          </div>
                          <Badge variant="outline" className="mt-2">
                            {rep.party}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        )}

        {/* Pagination */}
        {data?.pagination && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {data.pagination.page} of {data.pagination.pages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === data.pagination.pages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
