'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Heart, MessageCircle } from 'lucide-react';
import { Campaign } from '@/lib/api/types';
import { toast } from 'sonner';
import { useOptimisticCampaignSupport } from '@/hooks/useOptimisticUpdates';

interface CampaignCardProps {
  campaign: Campaign;
  isSupported?: boolean;
}

export function CampaignCard({ campaign, isSupported = false }: CampaignCardProps) {
  // Using optimistic updates for better UX
  const { support, unsupport, supportLoading, unsupportLoading } = useOptimisticCampaignSupport();

  const handleSupportToggle = () => {
    if (isSupported) {
      unsupport(campaign.id, {
        onSuccess: () => {
          toast.success('Campaign unsupported');
        },
        onError: () => {
          toast.error('Failed to unsupport campaign');
        },
      });
    } else {
      support(campaign.id, {
        onSuccess: () => {
          toast.success('Campaign supported!');
        },
        onError: () => {
          toast.error('Failed to support campaign');
        },
      });
    }
  };

  const progressPercentage = (campaign.supportersCount / campaign.goal) * 100;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline">{campaign.category}</Badge>
          <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
            {campaign.status}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">{campaign.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {campaign.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {campaign.supportersCount} / {campaign.goal}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(progressPercentage)}% complete
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{campaign.supportersCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span>{campaign.discussions.length}</span>
            </div>
          </div>
          <span className="text-muted-foreground">{campaign.district}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant={isSupported ? "outline" : "default"}
            size="sm"
            onClick={handleSupportToggle}
            disabled={supportLoading || unsupportLoading}
            className="flex-1"
          >
            <Heart className={`h-4 w-4 mr-2 ${isSupported ? 'fill-current' : ''}`} />
            {isSupported ? 'Supported' : 'Support'}
          </Button>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
