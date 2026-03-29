import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertServiceSchema } from "@shared/schema";
import { Plus, Pencil, Trash2, Wrench } from "lucide-react";
import type { Service } from "@shared/schema";
import { z } from "zod";

const serviceFormSchema = insertServiceSchema.extend({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

export default function AdminServicesManager() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const { data: services, isLoading } = useQuery<Service[]>({ queryKey: ["/api/services"] });

  const form = useForm<z.infer<typeof serviceFormSchema>>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: { title: "", description: "", category: "", image: "", featured: false, priceRange: "" },
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof serviceFormSchema>) => {
      if (editing) {
        const res = await apiRequest("PATCH", `/api/admin/services/${editing.id}`, data);
        return res.json();
      }
      const res = await apiRequest("POST", "/api/admin/services", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: editing ? "Service updated" : "Service created" });
      setOpen(false);
      setEditing(null);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Service deleted" });
    },
  });

  const openEdit = (service: Service) => {
    setEditing(service);
    form.reset({
      title: service.title,
      description: service.description,
      category: service.category,
      image: service.image || "",
      featured: service.featured || false,
      priceRange: service.priceRange || "",
    });
    setOpen(true);
  };

  const openNew = () => {
    setEditing(null);
    form.reset({ title: "", description: "", category: "", image: "", featured: false, priceRange: "" });
    setOpen(true);
  };

  return (
    <div data-testid="page-admin-services">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Services Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your waterproofing and painting services</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-blue-700 text-white gap-2" data-testid="button-add-service">
              <Plus className="w-4 h-4" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4" data-testid="form-service">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input placeholder="Service title" {...field} data-testid="input-service-title" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="waterproofing">Waterproofing</SelectItem>
                          <SelectItem value="painting">Painting</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea placeholder="Service description" rows={3} className="resize-none" {...field} data-testid="input-service-desc" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl><Input placeholder="/images/service-name.png" {...field} value={field.value || ""} data-testid="input-service-image" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Range</FormLabel>
                      <FormControl><Input placeholder="e.g., Rs. 5,000 - 15,000" {...field} value={field.value || ""} data-testid="input-service-price" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormLabel>Featured</FormLabel>
                      <FormControl><Switch checked={field.value || false} onCheckedChange={field.onChange} data-testid="switch-featured" /></FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-700 text-white" disabled={createMutation.isPending} data-testid="button-save-service">
                  {createMutation.isPending ? "Saving..." : editing ? "Update Service" : "Create Service"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="bg-white border rounded-lg p-4 animate-pulse h-20" />)}
        </div>
      ) : services && services.length > 0 ? (
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-4" data-testid={`service-row-${service.id}`}>
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {service.image && (
                  <img src={service.image} alt={service.title} className="w-16 h-16 rounded-md object-cover shrink-0 hidden sm:block" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 truncate">{service.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize">{service.category}</span>
                    {service.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Featured</span>}
                  </div>
                  <p className="text-gray-500 text-sm truncate">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="icon" variant="outline" onClick={() => openEdit(service)} data-testid={`button-edit-service-${service.id}`}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="text-red-600 border-red-200" onClick={() => deleteMutation.mutate(service.id)} data-testid={`button-delete-service-${service.id}`}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">No services yet</h3>
          <p className="text-gray-400 text-sm mt-1">Add your first service to get started.</p>
        </div>
      )}
    </div>
  );
}
