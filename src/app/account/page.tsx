
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, CreditCard, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AccountPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline mb-8">My Account</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold leading-none tracking-tight">Profile Settings</h2>
              <CardDescription>Manage your public profile and personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person face" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jane.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us a little about yourself" defaultValue="Lover of all things beauty and skincare. Always looking for the next best facial!" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold leading-none tracking-tight">Billing Information</h2>
              <CardDescription>Manage your payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <CreditCard className="w-8 h-8 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Visa ending in 1234</p>
                            <p className="text-sm text-muted-foreground">Expires 08/2026</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                </div>
              <Button>Add New Payment Method</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold leading-none tracking-tight">Security</h2>
              <CardDescription>Change your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
