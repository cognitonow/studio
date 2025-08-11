
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, Star, Repeat, DollarSign } from "lucide-react"
import { format } from 'date-fns';

interface ClientDetailsProps {
    clientName: string;
}

const mockClientHistory = {
    rating: 4.8,
    totalBookings: 5,
    averageSpend: 125.50,
    previousBookings: [
        { id: 'b1', service: 'Balayage', date: '2024-05-10', status: 'Completed' },
        { id: 'b2', service: 'Haircut & Blowdry', date: '2024-02-20', status: 'Completed' },
        { id: 'b3', service: 'Glaze Treatment', date: '2023-11-15', status: 'Completed' },
    ]
}

export function ClientDetails({ clientName }: ClientDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
            <User className="w-6 h-6 text-primary" />
            <span>Client Snapshot</span>
        </CardTitle>
        <CardDescription>A quick overview of {clientName}'s history with you.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
                <AvatarImage src="https://placehold.co/100x100.png" alt={clientName} data-ai-hint="person face" />
                <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-muted-foreground"/>
                    <span className="font-semibold">{mockClientHistory.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">Client Rating</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Repeat className="w-4 h-4 text-muted-foreground"/>
                    <span className="font-semibold">{mockClientHistory.totalBookings}</span>
                    <span className="text-muted-foreground">Total Bookings</span>
                </div>
                 <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground"/>
                    <span className="font-semibold">${mockClientHistory.averageSpend.toFixed(2)}</span>
                    <span className="text-muted-foreground">Average Spend</span>
                </div>
            </div>
        </div>
        <div>
            <h4 className="font-semibold mb-2">Previous Bookings</h4>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockClientHistory.previousBookings.map(booking => (
                        <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.service}</TableCell>
                            <TableCell>{format(new Date(booking.date), 'dd MMM yyyy')}</TableCell>
                            <TableCell><Badge variant="secondary">{booking.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
}
