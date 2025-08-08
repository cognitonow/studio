'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { suggestSkillBadges } from '@/ai/flows/suggest-skill-badges';
import { Loader2, Lightbulb, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockInput = {
  completedBookingsDescription:
    'The provider has completed 50 bookings in the last 3 months, primarily for "Balayage Hair Color" and "Bridal Makeup". There is a recurring theme of wedding-related services. Several bookings were for on-location services.',
  userRatingsDescription:
    'The provider has an average rating of 4.9 stars from 212 reviews. Common feedback includes "amazing colorist", "made me feel beautiful on my wedding day", "very professional and punctual", and "great with bridal parties".',
};

export function BadgeSuggester() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestBadges = async () => {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const result = await suggestSkillBadges(mockInput);
      setSuggestions(result.suggestedBadges);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="w-6 h-6 text-primary" />
          AI Skill Badge Suggestions
        </CardTitle>
        <CardDescription>
          Leverage AI to identify your top skills and get badge suggestions based on your booking history and client reviews.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
            <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4" /> Based on your profile, we're analyzing:</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>50 recent bookings for Balayage & Bridal Makeup.</li>
                <li>4.9-star average rating from 212 reviews.</li>
                <li>Positive feedback on color work and wedding services.</li>
            </ul>
        </div>
        
        <Button onClick={handleSuggestBadges} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : 'Suggest New Badges'}
        </Button>

        {error && <p className="text-destructive">{error}</p>}
        
        {suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Here are your suggested badges:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((badge, index) => (
                <Badge key={index} variant="default" className="text-base px-4 py-2">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
