
'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { List, PlusCircle, Trash2 } from 'lucide-react';
import { services as allServices, serviceCategories, providerServices as initialProviderServices } from '@/lib/data';
import type { Service } from '@/lib/types';

export function ServiceManagementCard() {
    const [providerServices, setProviderServices] = useState<Service[]>(initialProviderServices);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedServiceId, setSelectedServiceId] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [duration, setDuration] = useState<number | string>('');

    const handleAddService = () => {
        const serviceToAdd = allServices.find(s => s.id === selectedServiceId);
        if (serviceToAdd && !providerServices.find(s => s.id === selectedServiceId)) {
            const newService = {
                ...serviceToAdd,
                price: typeof price === 'number' ? price : serviceToAdd.price,
                duration: typeof duration === 'number' ? duration : serviceToAdd.duration,
            };
            setProviderServices(prev => [...prev, newService]);
        }
    };

    const handleRemoveService = (serviceId: string) => {
        setProviderServices(prev => prev.filter(s => s.id !== serviceId));
    };

    const filteredServices = selectedCategory
        ? allServices.filter(s => s.categoryId === selectedCategory)
        : [];
        
    const handleServiceSelect = (serviceId: string) => {
        setSelectedServiceId(serviceId);
        const service = allServices.find(s => s.id === serviceId);
        if (service) {
            setPrice(service.price);
            setDuration(service.duration);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><List className="w-5 h-5" />Service Management</CardTitle>
                <CardDescription>Add, edit, or remove the services you offer.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 p-4 border rounded-lg">
                    <h4 className="font-semibold">Add a New Service</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceCategories.map(cat => (
                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Service</Label>
                            <Select onValueChange={handleServiceSelect} value={selectedServiceId} disabled={!selectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredServices.map(service => (
                                        <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="duration">Duration (min)</Label>
                            <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                        </div>
                    </div>
                     <Button onClick={handleAddService} disabled={!selectedServiceId}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Service
                    </Button>
                </div>
                
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
                            {providerServices.map(service => (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell>${service.price}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

    