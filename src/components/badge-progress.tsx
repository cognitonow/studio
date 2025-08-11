
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Sparkles, Star, Heart } from 'lucide-react';

const upcomingBadges = [
  { 
    name: 'Top Rated', 
    progress: 90, 
    description: 'Get 10 more 5-star reviews to unlock.',
    icon: Star
  },
  { 
    name: 'Client Favorite', 
    progress: 75, 
    description: 'Complete 5 more bookings this month.',
    icon: Heart
  },
  { 
    name: 'Color Whiz', 
    progress: 40, 
    description: 'Complete 6 more balayage or highlight services.',
    icon: Sparkles
  },
];

export function BadgeProgress() {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Badge Progress
        </CardTitle>
        <CardDescription>
          Track your progress towards earning new skill badges to attract more clients.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {upcomingBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
            <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <h4 className="font-semibold">{badge.name}</h4>
                </div>
                <Progress value={badge.progress} />
                <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
            )
        })}
      </CardContent>
    </Card>
  );
}

    