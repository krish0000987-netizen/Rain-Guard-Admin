import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Phone, CheckCircle2, ArrowRight, Droplets, Shield, Award } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { usePageTitle } from "@/hooks/use-page-title";
import type { Service } from "@shared/schema";

export default function Waterproofing() {
  usePageTitle("Waterproofing Services - Rain Guard Mumbai", "Professional terrace, bathroom, roof & basement waterproofing in Mumbai. 5-year warranty. Call 9175193882.");
  const { data: services, isLoading } = useQuery<Service[]>({ queryKey: ["/api/services"] });
  const waterproofingServices = services?.filter(s => s.category === "waterproofing") || [];

  return (
    <div>
      <section className="relative py-20 sm:py-28" data-testid="section-waterproofing-hero">
        <div className="absolute inset-0">
          <img src="/images/service-terrace.png" alt="Waterproofing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-blue-800/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-1.5 mb-4">
              <Droplets className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">Professional Waterproofing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4" data-testid="text-waterproofing-title">
              Waterproofing Services
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Rain Guard uses high-quality chemicals & modern methods to permanently stop leakage. 5-year warranty on all waterproofing work.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:9175193882" data-testid="button-waterproofing-call">
                <Button size="lg" className="bg-blue-600 text-white gap-2">
                  <Phone className="w-5 h-5" /> Get Free Quote
                </Button>
              </a>
              <a href="https://wa.me/919175193882?text=I%20need%20waterproofing%20service" target="_blank" rel="noopener noreferrer" data-testid="button-waterproofing-whatsapp">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white gap-2">
                  <SiWhatsapp className="w-5 h-5" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-waterproofing-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Our Waterproofing Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We offer comprehensive waterproofing solutions for every type of leakage problem.</p>
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
              {waterproofingServices.map((service) => (
                <Card key={service.id} className="group border-blue-100 transition-shadow hover:shadow-md" data-testid={`card-service-${service.id}`}>
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
                      <Link href="/contact" data-testid={`link-service-enquire-${service.id}`}>
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

      <section className="py-16 sm:py-20 bg-blue-50" data-testid="section-waterproofing-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Our Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Free Inspection", desc: "Our experts visit your property and inspect the leakage problem." },
              { step: "2", title: "Solution Plan", desc: "We suggest the best waterproofing method and provide a quote." },
              { step: "3", title: "Professional Work", desc: "Our skilled team applies high-quality waterproofing chemicals." },
              { step: "4", title: "5-Year Warranty", desc: "We guarantee our work with a comprehensive 5-year warranty." },
            ].map((item, i) => (
              <div key={i} className="text-center" data-testid={`process-step-${i}`}>
                <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Shield, title: "5-Year Warranty", desc: "Guaranteed protection against leakage" },
              { icon: Award, title: "Premium Chemicals", desc: "Only best quality waterproofing materials" },
              { icon: Droplets, title: "100% Leak Proof", desc: "Permanent solution for all types of leakage" },
            ].map((item, i) => (
              <div key={i} className="p-6" data-testid={`feature-${i}`}>
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
