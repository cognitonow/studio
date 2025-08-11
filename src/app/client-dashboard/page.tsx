
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Heart, Star } from "lucide-react"
import Link from "next/link"
import { ProviderCard } from "@/components/provider-card"
import { providers, getFeaturedProviders } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ClientDashboardPage() {
  const favoriteProvider = providers[0];
  const suggestedProvider = providers[1];
  const favoriteProviderFirstService = favoriteProvider.services[0];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline mb-8">Client Dashboard</h1>
      
      {/* Section 1: Analytics Dashboard */}
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 mb-12">
        {/* Appointments Used */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Star className="w-6 h-6 text-primary"/>
                Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-6xl font-bold">6</p>
              <p className="text-muted-foreground">Appointments Completed</p>
            </div>
            <Button asChild className="w-full">
                <Link href="/bookings">
                    View Booking History
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Favourite Provider */}
        <Card className="lg:col-span-1">
          <CardHeader>
             <CardTitle className="flex items-center gap-2 font-headline">
                <Heart className="w-6 h-6 text-primary"/>
                Favorite Provider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/provider/${favoriteProvider.id}`} className="block group">
              <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                      <AvatarImage src={favoriteProvider.avatarUrl} data-ai-hint={favoriteProvider.dataAiHint} />
                      <AvatarFallback>{favoriteProvider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                      <h3 className="text-lg font-semibold group-hover:underline">{favoriteProvider.name}</h3>
                      <p className="text-sm text-muted-foreground">{favoriteProvider.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span>{favoriteProvider.rating} ({favoriteProvider.reviewCount} reviews)</span>
                      </div>
                  </div>
              </div>
            </Link>
             <Button asChild className="w-full mt-6">
                <Link href={`/book/${favoriteProvider.id}?service=${favoriteProviderFirstService.id}`}>
                    Book Again
                </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Suggestion */}
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Star className="w-6 h-6 text-primary"/>
                    Try Someone New
                </CardTitle>
                <CardDescription>Based on your history, we think you'll love:</CardDescription>
            </CardHeader>
            <CardContent>
                <ProviderCard provider={suggestedProvider} />
            </CardContent>
        </Card>
      </div>

      {/* Section 2: Booking Management */}
       <div>
        <h2 className="text-3xl font-bold font-headline mb-4">Booking Management</h2>
        <Card>
            <CardHeader>
                <CardTitle>Manage Your Appointments</CardTitle>
                <CardDescription>View your upcoming and past bookings, or make changes to your appointments.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Ready to manage your bookings? Click the button below to see your full history.</p>
                <Button asChild size="lg">
                    <Link href="/bookings">
                        <Calendar className="mr-2 h-5 w-5" />
                        Go to My Bookings
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
