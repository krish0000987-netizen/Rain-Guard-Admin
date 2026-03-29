import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Droplets, LogIn } from "lucide-react";
import { z } from "zod";
import { useLocation } from "wouter";

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLogin() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const res = await apiRequest("POST", "/api/admin/login", data);
      return res.json();
    },
    onSuccess: () => {
      navigate("/admin/dashboard");
    },
    onError: (error: Error) => {
      toast({ title: "Login Failed", description: error.message || "Invalid email or password", variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" data-testid="page-admin-login">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Droplets className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Rain Guard Waterproofing & Painting</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4" data-testid="form-admin-login">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@rainguard.com" {...field} data-testid="input-admin-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} data-testid="input-admin-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-700 text-white gap-2" disabled={mutation.isPending} data-testid="button-admin-login">
                <LogIn className="w-4 h-4" />
                {mutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
