

'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { List, PlusCircle, Trash2, Edit, Save } from 'lucide-react';
import { services as allServices, serviceCategories, saveProviderServices, getProviderById } from '@/lib/data';
import type { Service } from '@/lib/types';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { AddServiceDialogContent } from '@/components/manage-booking/add-service-dialog';

interface ServiceManagementCardProps {
    providerId: string;
}

export function ServiceManagementCard({ providerId }: ServiceManagementCardProps) {
    const { toast } = useToast();
    const [providerServices, setProviderServices] = useState<Service[]>([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
    
    useEffect(() => {
        const provider = getProviderById(providerId); 
        if (provider) {
            setProviderServices([...provider.services]);
        }
    }, [providerId]);
    
    const handleAddPredefinedService = (serviceToAdd: Service) => {
        if (providerServices.find(s => s.id === serviceToAdd.id)) return;

        setProviderServices(prev => [...prev, serviceToAdd].sort((a,b) => a.name.localeCompare(b.name)));
        setHasUnsavedChanges(true);
        setIsAddServiceDialogOpen(false);
    };
    
    const handleAddCustomServiceToState = (name: string, price: number, duration: number) => {
        const newCustomService: Service = {
            id: `custom-${Date.now()}`,
            categoryId: 'custom', 
            name: name,
            description: 'Custom service added by provider.',
            price: price,
            duration: duration,
        };
        setProviderServices(prev => [...prev, newCustomService].sort((a, b) => a.name.localeCompare(b.name)));
        setHasUnsavedChanges(true);
        setIsAddServiceDialogOpen(false);
    };


    const handleRemoveService = (serviceId: string) => {
        setProviderServices(prev => prev.filter(s => s.id !== serviceId));
        setHasUnsavedChanges(true);
    };
    
    const handleSaveChangesToDataSource = () => {
        saveProviderServices(providerId, providerServices);
        setHasUnsavedChanges(false);
        toast({
            title: "Services Updated",
            description: "Your list of services has been successfully saved.",
        });
    };


    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2"><List className="w-5 h-5" />Service Management</CardTitle>
                        <CardDescription>Add, edit, or remove the services you offer.</CardDescription>
                    </div>
                     {hasUnsavedChanges && (
                        <Button onClick={handleSaveChangesToDataSource}>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
                    <DialogTrigger asChild>
                         <Button variant="secondary">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Service
                        </Button>
                    </DialogTrigger>
                    <AddServiceDialogContent
                        providerServices={allServices.filter(s => !providerServices.some(ps => ps.id === s.id))}
                        onAddService={handleAddPredefinedService}
                        onAddCustomService={handleAddCustomServiceToState}
                    />
                </Dialog>
                
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Your Current Services</h4>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {providerServices.length > 0 ? providerServices.map(service => (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell>${service.price}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" disabled>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center h-24">You have no services configured.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
