'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sprout } from "lucide-react";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth";
import type { User, UserRole } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/hooks/use-user-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>('client');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { user, error } = await signUp({ name, email, password, role });

    setIsLoading(false);

    if (error || !user) {
      toast({
        title: "Sign Up Failed",
        description: error?.message || "An unknown error occurred.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Your account has been created.",
    });
    
    login(user as User);
    
    router.push('/dashboard');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { user, error } = await signIn({ email, password });
    setIsLoading(false);

    if (error || !user) {
        toast({
            title: "Login Failed",
            description: error?.message || "Please check your credentials and try again.",
            variant: "destructive",
        });
        return;
    }

    toast({
        title: "Welcome Back!",
        description: "You've been successfully logged in.",
    });

    login(user);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/40 p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
        <div className="flex justify-center mb-4">
            <TabsList>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="login">Log In</TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="signup">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                <div className="mb-4 flex justify-center">
                    <Sprout className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold font-headline">
                    Create an Account
                </CardTitle>
                <CardDescription>
                    Join our community of beauty professionals and clients.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                        id="signup-email"
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                    <Label>I am a...</Label>
                    <RadioGroup value={role} onValueChange={(value: UserRole) => setRole(value)} className="grid grid-cols-2 gap-4">
                        <div>
                        <RadioGroupItem value="client" id="client" className="peer sr-only" />
                        <Label
                            htmlFor="client"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            Client
                        </Label>
                        </div>
                        <div>
                        <RadioGroupItem
                            value="provider"
                            id="provider"
                            className="peer sr-only"
                        />
                        <Label
                            htmlFor="provider"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            Provider
                        </Label>
                        </div>
                    </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </form>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="login">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                <div className="mb-4 flex justify-center">
                    <Sprout className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold font-headline">
                    Welcome Back!
                </CardTitle>
                <CardDescription>
                    Log in to access your dashboard and bookings.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSignIn}>
                        <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input
                                id="login-email"
                                type="email"
                                placeholder="john.doe@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
