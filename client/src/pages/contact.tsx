import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { usePageTitle } from "@/hooks/use-page-title";
import { z } from "zod";

const contactFormSchema = insertLeadSchema.extend({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  location: z.string().min(2, "Location is required"),
  serviceNeeded: z.string().min(1, "Please select a service"),
});

export default function Contact() {
  usePageTitle("Contact Us - Rain Guard Waterproofing & Painting", "Get a free inspection and estimate. Call 9175193882 or WhatsApp us.");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      serviceNeeded: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactFormSchema>) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Thank you!", description: "We received your enquiry. Our team will contact you soon." });
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Something went wrong. Please try calling us directly.", variant: "destructive" });
    },
  });

  return (
    <div>
      <section className="relative py-20 sm:py-24" data-testid="section-contact-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-contact-title">Contact Us</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Get a free inspection and estimate. We're here to help protect your home.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Send Us an Enquiry</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-5" data-testid="form-contact">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Your area/location in Mumbai" {...field} data-testid="input-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceNeeded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="terrace-waterproofing">Terrace Waterproofing</SelectItem>
                            <SelectItem value="bathroom-waterproofing">Bathroom Waterproofing</SelectItem>
                            <SelectItem value="roof-leakage">Roof Leakage Repair</SelectItem>
                            <SelectItem value="basement-waterproofing">Basement Waterproofing</SelectItem>
                            <SelectItem value="wall-crack">Wall Crack Repair</SelectItem>
                            <SelectItem value="interior-painting">Interior Painting</SelectItem>
                            <SelectItem value="exterior-painting">Exterior Painting</SelectItem>
                            <SelectItem value="texture-painting">Texture Painting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your problem or requirements..." className="resize-none" rows={4} {...field} value={field.value || ""} data-testid="input-message" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="bg-blue-700 text-white gap-2 w-full sm:w-auto" disabled={mutation.isPending} data-testid="button-submit-contact">
                    <Send className="w-4 h-4" />
                    {mutation.isPending ? "Sending..." : "Send Enquiry"}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <a href="tel:9175193882" className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg" data-testid="contact-phone">
                  <div className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm">Call Us</h3>
                    <p className="text-blue-700 font-medium">9175193882</p>
                  </div>
                </a>
                <a href="https://wa.me/919175193882" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-green-50 rounded-lg" data-testid="contact-whatsapp">
                  <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center shrink-0">
                    <SiWhatsapp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">WhatsApp</h3>
                    <p className="text-green-700 font-medium">Chat with us</p>
                  </div>
                </a>
                <a href="mailto:rainguardwaterproofing@gmail.com" className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg" data-testid="contact-email">
                  <div className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm">Email</h3>
                    <p className="text-blue-700 text-sm break-all">rainguardwaterproofing@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg" data-testid="contact-address">
                  <div className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm">Address</h3>
                    <p className="text-gray-600 text-sm">Grd Floor, Damooshet Chawl, Dharavi Main Road, Mumbai - 400017</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg" data-testid="contact-hours">
                  <div className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm">Working Hours</h3>
                    <p className="text-gray-600 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600 text-sm">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[400px] bg-gray-200" data-testid="section-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7!2d72.85!3d19.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDharavi%20Main%20Road%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Rain Guard location"
        />
      </section>
    </div>
  );
}
