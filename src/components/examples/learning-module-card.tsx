'use client';

import { useState } from 'react';
import { useLearningActions } from '@/hooks/useLearning';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen, Award } from 'lucide-react';
import { LearningModule } from '@/lib/api/types';
import { toast } from 'sonner';

interface LearningModuleCardProps {
  module: LearningModule;
  userProgress?: number;
  isCompleted?: boolean;
}

export function LearningModuleCard({
  module,
  userProgress = 0,
  isCompleted = false
}: LearningModuleCardProps) {
  const [currentProgress, setCurrentProgress] = useState(userProgress);
  const { updateProgress, updateProgressLoading } = useLearningActions();

  const handleStartModule = () => {
    if (currentProgress === 0) {
      updateProgress(
        { moduleId: module.id, progress: 10 },
        {
          onSuccess: () => {
            setCurrentProgress(10);
            toast.success('Module started!');
          },
          onError: () => {
            toast.error('Failed to start module');
          },
        }
      );
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getDifficultyColor(module.difficulty)}>
            {module.difficulty}
          </Badge>
          <Badge variant="outline">{module.category}</Badge>
        </div>
        <CardTitle className="line-clamp-2">{module.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {module.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Module Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{module.estimatedTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span>{module.points} points</span>
            </div>
          </div>
          <span className="text-muted-foreground">{module.region}</span>
        </div>

        {/* Progress */}
        {currentProgress > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-2" />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {isCompleted ? (
            <Button variant="outline" className="flex-1">
              <Award className="h-4 w-4 mr-2" />
              Completed
            </Button>
          ) : currentProgress > 0 ? (
            <Button className="flex-1">
              <BookOpen className="h-4 w-4 mr-2" />
              Continue
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={handleStartModule}
              disabled={updateProgressLoading}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {updateProgressLoading ? 'Starting...' : 'Start Module'}
            </Button>
          )}
          <Button variant="outline" size="icon">
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
