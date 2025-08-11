
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, BarChart2, Users, LineChart, Star } from "lucide-react"
import { MonthlyEarningsChart } from "@/components/monthly-earnings-chart"

export default function LookerDashboardPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Eye className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Looker Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,540</div>
                <p className="text-xs text-muted-foreground">+15.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Booking Trends</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+1,280</div>
                <p className="text-xs text-muted-foreground">+8.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Popular Services</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Balayage</div>
                <p className="text-xs text-muted-foreground">Most booked service this week</p>
              </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Platform Analytics</CardTitle>
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">View Details</div>
                    <p className="text-xs text-muted-foreground">Go to advanced analytics</p>
                </CardContent>
            </Card>
      </div>
      <div className="mt-8">
        <MonthlyEarningsChart />
      </div>
    </div>
  )
}
