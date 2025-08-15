

'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { List, PlusCircle, Trash2, Edit, Save } from 'lucide-react';
import { services as allServices, serviceCategories, saveProviderServices, getProviderById } from '@/lib/data';
import type { Service } from '@/lib/types';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export function ServiceManagementCard() {
    const { toast } = useToast();
    const [providerServices, setProviderServices] = useState<Service[]>([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedServiceId, setSelectedServiceId] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [duration, setDuration] = useState<number | string>('');
    const [description, setDescription] = useState<string>('');
    const [customServiceName, setCustomServiceName] = useState('');


    // State for the edit dialog
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
    const [editedCategory, setEditedCategory] = useState('');
    const [editedServiceId, setEditedServiceId] = useState('');
    const [editedPrice, setEditedPrice] = useState<number | string>('');
    const [editedDuration, setEditedDuration] = useState<number | string>('');
    const [editedDescription, setEditedDescription] = useState<string>('');
    const [editedName, setEditedName] = useState('');

    useEffect(() => {
        // Load initial services for the hardcoded provider '3'
        const provider = getProviderById('3');
        if (provider) {
            setProviderServices([...provider.services]);
        }
    }, []);


    const handleAddService = () => {
        let serviceToAdd: Service | undefined;

        if (selectedServiceId === 'custom') {
            if (!customServiceName || !selectedCategory) return;
            serviceToAdd = {
                id: `custom-${Date.now()}`,
                categoryId: selectedCategory,
                name: customServiceName,
                description: description,
                price: Number(price),
                duration: Number(duration),
            };
        } else {
            const baseService = allServices.find(s => s.id === selectedServiceId);
            if (!baseService) return;
            serviceToAdd = {
                ...baseService,
                price: typeof price === 'number' ? price : baseService.price,
                duration: typeof duration === 'number' ? duration : baseService.duration,
                description: description || baseService.description,
            };
        }

        if (serviceToAdd && !providerServices.find(s => s.id === serviceToAdd!.id)) {
            setProviderServices(prev => [...prev, serviceToAdd!].sort((a,b) => a.name.localeCompare(b.name)));
             // Reset form
            setSelectedCategory('');
            setSelectedServiceId('');
            setCustomServiceName('');
            setPrice('');
            setDuration('');
setDescription('');
            setHasUnsavedChanges(true);
        }
    };

    const handleRemoveService = (serviceId: string) => {
        setProviderServices(prev => prev.filter(s => s.id !== serviceId));
        setHasUnsavedChanges(true);
    };

    const handleServiceSelect = (serviceId: string) => {
        setSelectedServiceId(serviceId);
        if (serviceId === 'custom') {
            setCustomServiceName('');
            setPrice('');
            setDuration('');
            setDescription('');
        } else {
            const service = allServices.find(s => s.id === serviceId);
            if (service) {
                setPrice(service.price);
                setDuration(service.duration);
                setDescription(service.description);
            }
        }
    }

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        // Reset service selection when category changes
        setSelectedServiceId('');
        setPrice('');
        setDuration('');
        setDescription('');
    }

    const handleOpenEditDialog = (service: Service) => {
        setServiceToEdit(service);
        setEditedCategory(service.categoryId);
        setEditedServiceId(service.id);
        setEditedPrice(service.price);
        setEditedDuration(service.duration);
        setEditedDescription(service.description);
        setEditedName(service.name);
        setIsEditDialogOpen(true);
    }
    
    const handleSaveDialogChanges = () => {
        if (!serviceToEdit) return;

        const isCustom = serviceToEdit.id.startsWith('custom-');
        
        const updatedService: Service = {
            ...serviceToEdit,
            categoryId: editedCategory,
            name: isCustom ? editedName : allServices.find(s => s.id === editedServiceId)?.name || serviceToEdit.name,
            price: Number(editedPrice),
            duration: Number(editedDuration),
            description: editedDescription,
            id: isCustom ? serviceToEdit.id : editedServiceId,
        };

        setProviderServices(prevServices => prevServices.map(s => 
            s.id === serviceToEdit.id ? updatedService : s
        ));
        
        setIsEditDialogOpen(false);
        setServiceToEdit(null);
        setHasUnsavedChanges(true);
    };
    
    const handleEditCategoryChange = (categoryId: string) => {
        setEditedCategory(categoryId);
        if (!serviceToEdit?.id.startsWith('custom-')) {
            setEditedServiceId('');
            setEditedPrice('');
            setEditedDuration('');
            setEditedDescription('');
        }
    }

    const handleEditServiceSelect = (serviceId: string) => {
        setEditedServiceId(serviceId);
        const service = allServices.find(s => s.id === serviceId);
        if (service) {
            setEditedPrice(service.price);
            setEditedDuration(service.duration);
            setEditedDescription(service.description);
        }
    }

    const handleSaveChangesToDataSource = () => {
        console.log('[ServiceManagementCard] Saving services:', providerServices);
        // This function now also adds custom services to the main `services` list
        // This assumes provider ID '3' for Chloe.
        saveProviderServices('3', providerServices);
        setHasUnsavedChanges(false);
        toast({
            title: "Services Updated",
            description: "Your list of services has been successfully saved.",
        });
    };

    const filteredServices = selectedCategory
        ? allServices.filter(s => s.categoryId === selectedCategory && !providerServices.some(ps => ps.id === s.id))
        : [];
        
    const filteredEditServices = editedCategory
        ? allServices.filter(s => s.categoryId === editedCategory)
        : [];

    const isEditingCustom = serviceToEdit?.id.startsWith('custom-');

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
                <div className="space-y-4 p-4 border rounded-lg">
                    <h4 className="font-semibold">Add a New Service</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
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
                                    {filteredServices.length > 0 && filteredServices.map(service => (
                                        <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                                    ))}
                                    <SelectItem value="custom">Create Custom Service</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         {selectedServiceId === 'custom' && (
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="custom-name">Custom Service Name</Label>
                                <Input id="custom-name" value={customServiceName} onChange={e => setCustomServiceName(e.target.value)} placeholder="e.g., Express Manicure" />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} disabled={!selectedServiceId} />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="duration">Duration (min)</Label>
                            <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} disabled={!selectedServiceId} />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a description for the service." disabled={!selectedServiceId} />
                    </div>
                     <Button onClick={handleAddService} disabled={!selectedServiceId || (selectedServiceId === 'custom' && !customServiceName)}>
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
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(service)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Edit Service Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Service</DialogTitle>
                            <DialogDescription>
                                Update the details for this service.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                           <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select onValueChange={handleEditCategoryChange} value={editedCategory}>
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
                                {isEditingCustom ? (
                                     <div className="space-y-2">
                                        <Label htmlFor="edit-name">Service Name</Label>
                                        <Input id="edit-name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Label>Service</Label>
                                        <Select onValueChange={handleEditServiceSelect} value={editedServiceId} disabled={!editedCategory}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredEditServices.length > 0 ? filteredEditServices.map(service => (
                                                    <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                                                )) : <SelectItem value="none" disabled>No available services</SelectItem>}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-price">Price ($)</Label>
                                    <Input id="edit-price" type="number" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-duration">Duration (min)</Label>
                                    <Input id="edit-duration" type="number" value={editedDuration} onChange={(e) => setEditedDuration(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea id="edit-description" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} rows={4} />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button type="button" onClick={handleSaveDialogChanges}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
    