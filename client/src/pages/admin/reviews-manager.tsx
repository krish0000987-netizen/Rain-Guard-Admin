import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertReviewSchema } from "@shared/schema";
import { Plus, Trash2, Star } from "lucide-react";
import type { Review } from "@shared/schema";
import { z } from "zod";

const reviewFormSchema = insertReviewSchema.extend({
  customerName: z.string().min(2, "Name is required"),
  review: z.string().min(5, "Review text is required"),
  rating: z.coerce.number().min(1).max(5),
});

export default function AdminReviewsManager() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { data: reviews, isLoading } = useQuery<Review[]>({ queryKey: ["/api/admin/reviews"] });

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { customerName: "", review: "", rating: 5, location: "", approved: true },
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof reviewFormSchema>) => {
      const res = await apiRequest("POST", "/api/admin/reviews", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({ title: "Review added" });
      setOpen(false);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({ title: "Review deleted" });
    },
  });

  return (
    <div data-testid="page-admin-reviews">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Reviews</h1>
          <p className="text-gray-500 text-sm mt-1">Manage customer reviews</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-700 text-white gap-2" data-testid="button-add-review">
              <Plus className="w-4 h-4" /> Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle>Add Customer Review</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4" data-testid="form-review">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl><Input placeholder="Customer name" {...field} data-testid="input-review-name" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} value={String(field.value)}>
                        <FormControl>
                          <SelectTrigger data-testid="select-rating">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[5,4,3,2,1].map(r => (
                            <SelectItem key={r} value={String(r)}>{r} Star{r > 1 ? "s" : ""}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review</FormLabel>
                      <FormControl><Textarea placeholder="Customer review..." rows={3} className="resize-none" {...field} data-testid="input-review-text" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Optional)</FormLabel>
                      <FormControl><Input placeholder="e.g., Andheri, Mumbai" {...field} value={field.value || ""} data-testid="input-review-location" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-700 text-white" disabled={createMutation.isPending} data-testid="button-save-review">
                  {createMutation.isPending ? "Saving..." : "Add Review"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="bg-white border rounded-lg p-4 animate-pulse h-24" />)}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between gap-4" data-testid={`review-row-${review.id}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">"{review.review}"</p>
                {review.location && <p className="text-gray-400 text-xs mt-1">{review.location}</p>}
              </div>
              <Button size="icon" variant="outline" className="text-red-600 border-red-200 shrink-0" onClick={() => deleteMutation.mutate(review.id)} data-testid={`button-delete-review-${review.id}`}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">No reviews yet</h3>
          <p className="text-gray-400 text-sm mt-1">Add customer reviews to display on the website.</p>
        </div>
      )}
    </div>
  );
}
