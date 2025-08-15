

'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import { allBadges } from '@/lib/badges';
import type { ProviderBadge } from '@/lib/types';

// Mock function to get badges a user has vs. doesn't have
const getFauxBadgeProgress = (currentBadges: ProviderBadge[]) => {
    const currentBadgeNames = currentBadges.map(b => b.name);
    return allBadges.filter(b => b.id !== 'new-pro' && !currentBadgeNames.includes(b.name)).slice(0, 3);
}

export function BadgeProgress() {
  // In a real app, you'd get the provider's current badges from their profile
  const providerCurrentBadges: ProviderBadge[] = [{ name: 'Top Rated', level: 'Intermediate'}];
  const upcomingBadges = getFauxBadgeProgress(providerCurrentBadges);

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
            // We'll mock progress for now
            const mockProgress = [75, 40, 15][index] || 50; 
            const nextLevel = 'New'; // In a real app, this would be calculated
            return (
            <div key={badge.id} className="space-y-2">
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <h4 className="font-semibold">{badge.levels[nextLevel].name}</h4>
                </div>
                <Progress value={mockProgress} />
                <p className="text-sm text-muted-foreground">{badge.levels[nextLevel].rules}</p>
            </div>
            )
        })}
      </CardContent>
    </Card>
  );
}
