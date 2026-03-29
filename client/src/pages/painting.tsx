import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Phone, ArrowRight, PaintBucket, Palette, Brush } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { usePageTitle } from "@/hooks/use-page-title";
import type { Service } from "@shared/schema";

export default function Painting() {
  usePageTitle("Painting Services - Rain Guard Mumbai", "Premium interior & exterior painting services in Mumbai. Best brands, skilled painters. Call 9175193882.");
  const { data: services, isLoading } = useQuery<Service[]>({ queryKey: ["/api/services"] });
  const paintingServices = services?.filter(s => s.category === "painting") || [];

  return (
    <div>
      <section className="relative py-20 sm:py-28" data-testid="section-painting-hero">
        <div className="absolute inset-0">
          <img src="/images/hero-painting.png" alt="Painting service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-blue-800/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-1.5 mb-4">
              <PaintBucket className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">Professional Painting</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4" data-testid="text-painting-title">
              Painting Services
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              We provide premium finish painting with best brands & skilled painters. Transform your home with beautiful colors.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:9175193882" data-testid="button-painting-call">
                <Button size="lg" className="bg-blue-600 text-white gap-2">
                  <Phone className="w-5 h-5" /> Get Free Quote
                </Button>
              </a>
              <a href="https://wa.me/919175193882?text=I%20need%20painting%20service" target="_blank" rel="noopener noreferrer" data-testid="button-painting-whatsapp">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white gap-2">
                  <SiWhatsapp className="w-5 h-5" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-painting-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Our Painting Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From interior walls to exterior facades, we deliver a flawless finish every time.</p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5].map(i => (
                <Card key={i} className="animate-pulse border-blue-100">
                  <CardContent className="p-6">
                    <div className="h-48 bg-gray-200 rounded-md mb-4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paintingServices.map((service) => (
                <Card key={service.id} className="group border-blue-100 transition-shadow hover:shadow-md" data-testid={`card-painting-${service.id}`}>
                  <CardContent className="p-0">
                    {service.image && (
                      <div className="h-48 overflow-hidden rounded-t-lg">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-blue-900 text-lg mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                      {service.priceRange && (
                        <p className="text-blue-700 font-medium text-sm mb-4">Starting from {service.priceRange}</p>
                      )}
                      <Link href="/contact" data-testid={`link-painting-enquire-${service.id}`}>
                        <Button variant="outline" size="sm" className="gap-2 text-blue-700 border-blue-200">
                          Get Quote <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Palette, title: "Premium Brands", desc: "Asian Paints, Berger, Nerolac, Dulux" },
              { icon: Brush, title: "Expert Painters", desc: "Skilled professionals with 10+ years experience" },
              { icon: PaintBucket, title: "Perfect Finish", desc: "Smooth, clean, and long-lasting paint finish" },
            ].map((item, i) => (
              <div key={i} className="p-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="font-bold text-blue-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
