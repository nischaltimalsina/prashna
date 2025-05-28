import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {  MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import { Official as OfficialType } from "@/lib/api/types";
export function Official({official}: { official: OfficialType}) {
  return <Card key={official.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{official.name}</span>
                  {official.verified && <Badge variant="secondary">Verified</Badge>}
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
            </Card>;
}
