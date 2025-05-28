'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Search } from 'lucide-react';
import { useOfficials } from '@/hooks/useOfficials';
import { useInfiniteOfficials } from '@/hooks/useInfiniteQuery';

export function OfficialsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Using regular pagination
  const { data, isLoading, error, refetch } = useOfficials({
    page: 1,
    limit: 10,
    district: selectedDistrict || undefined,
  });

  // Using infinite scroll (alternative approach)
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteOfficials({
    district: selectedDistrict || undefined,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-destructive mb-4">Failed to load officials</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const officials = data?.data || [];

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search officials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Input
          placeholder="Filter by district..."
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="md:w-48"
        />
      </div>

      {/* Officials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {officials
          .filter((official) =>
            official.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((official) => (
            <Card key={official.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{official.name}</span>
                  {official.verified && (
                    <Badge variant="secondary">Verified</Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{official.position}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{official.district}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Rating: {official.averageRating.overall.toFixed(1)}/5
                  </span>
                  <Badge variant="outline">{official.party}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Pagination Info */}
      {data?.pagination && (
        <div className="flex justify-center text-sm text-muted-foreground">
          Page {data.pagination.page} of {data.pagination.pages}
          ({data.pagination.total} total officials)
        </div>
      )}
    </div>
  );
}
