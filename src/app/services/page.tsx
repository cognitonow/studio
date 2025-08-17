
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useListServicesQuery } from "@firebasegen/default-connector/react";
import { ServerCrash } from "lucide-react";
import { app } from "@/lib/firebase";

export default function ServicesPage() {
  const { data, loading, error } = useListServicesQuery(app);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8">Available Services</h1>
        <Card>
          <CardHeader>
            <CardTitle>Services from Data Connect</CardTitle>
            <CardDescription>
              This list is fetched directly from your Firebase Data Connect backend.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-muted-foreground">Loading services...</p>}
            {error && (
              <div className="text-destructive-foreground bg-destructive/90 p-4 rounded-md flex items-center gap-4">
                <ServerCrash className="w-8 h-8"/>
                <div>
                    <h3 className="font-semibold">Error Fetching Data</h3>
                    <p>{error.message}</p>
                </div>
              </div>
            )}
            {data && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.services?.map((service) => (
                    service && (
                        <TableRow key={service.id}>
                            <TableCell className="font-mono text-xs">{service.id}</TableCell>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell className="text-right">${service.price.toFixed(2)}</TableCell>
                        </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
