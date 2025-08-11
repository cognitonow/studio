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
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Skill Badge Suggestions
        </CardTitle>
        <CardDescription>
          Get badge suggestions based on your booking history and client reviews.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
            <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4" /> We're analyzing:</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>50 recent bookings for Balayage & Bridal Makeup.</li>
                <li>4.9-star average rating from 212 reviews.</li>
                <li>Feedback on color work and wedding services.</li>
            </ul>
        </div>
        
        <Button onClick={handleSuggestBadges} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : 'Suggest Badges'}
        </Button>

        {error && <p className="text-destructive text-sm">{error}</p>}
        
        {suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Suggested badges to add:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((badge, index) => (
                <Button key={index} variant="secondary" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {badge}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
