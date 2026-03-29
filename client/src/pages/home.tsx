import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Phone, Shield, Award, Clock, MapPin, IndianRupee, Star, Droplets, PaintBucket, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { usePageTitle } from "@/hooks/use-page-title";
import type { Service, Review } from "@shared/schema";

export default function Home() {
  usePageTitle("Rain Guard Waterproofing & Painting - Mumbai's Trusted Experts", "Professional waterproofing and painting services in Mumbai. 10+ years experience, 5-year warranty. Call 9175193882.");
  const { data: services } = useQuery<Service[]>({ queryKey: ["/api/services"] });
  const { data: reviews } = useQuery<Review[]>({ queryKey: ["/api/reviews"] });

  const waterproofingServices = services?.filter(s => s.category === "waterproofing").slice(0, 5) || [];
  const paintingServices = services?.filter(s => s.category === "painting").slice(0, 5) || [];

  return (
    <div>
      <section className="relative min-h-[600px] sm:min-h-[700px] flex items-center" data-testid="section-hero">
        <div className="absolute inset-0">
          <img src="/images/hero-waterproofing.png" alt="Waterproofing service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-blue-900/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">Mumbai's #1 Waterproofing Experts</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-testid="text-hero-title">
              Stop Leakage. Protect Your Home.{" "}
              <span className="text-blue-400">Increase Property Value.</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed max-w-lg">
              Professional waterproofing and painting services in Mumbai with 5-year warranty. Trusted by 1000+ homeowners.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:9175193882" data-testid="button-hero-call">
                <Button size="lg" className="bg-blue-600 text-white gap-2 text-base px-6">
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
              </a>
              <a href="https://wa.me/919175193882?text=Hi%2C%20I%20need%20a%20free%20inspection%20for%20my%20property." target="_blank" rel="noopener noreferrer" data-testid="button-hero-whatsapp">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white gap-2 text-base px-6">
                  <SiWhatsapp className="w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
              <Link href="/contact" data-testid="button-hero-inspection">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white gap-2 text-base px-6">
                  Free Inspection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Why Choose Rain Guard?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We combine expertise, quality materials, and honest pricing to deliver the best waterproofing and painting solutions.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { icon: Clock, title: "10+ Years", desc: "Experience" },
              { icon: Award, title: "1000+", desc: "Projects Done" },
              { icon: Shield, title: "5 Year", desc: "Warranty" },
              { icon: MapPin, title: "Mumbai", desc: "Local Experts" },
              { icon: IndianRupee, title: "Affordable", desc: "Best Price" },
            ].map((item, i) => (
              <Card key={i} className="text-center p-6 border-blue-100 bg-blue-50/50" data-testid={`card-why-${i}`}>
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="font-bold text-blue-900 text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50" data-testid="section-services-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Complete waterproofing and painting solutions for your home and building.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-700 rounded-md flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Waterproofing</h3>
                  <p className="text-sm text-gray-500">Stop leakage permanently</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {waterproofingServices.length > 0 ? waterproofingServices.map(s => (
                  <li key={s.id} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-sm">{s.title}</span>
                  </li>
                )) : (
                  ["Terrace Waterproofing", "Bathroom Waterproofing", "Roof Leakage Repair", "Basement Waterproofing", "Wall Crack Repair"].map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-sm">{s}</span>
                    </li>
                  ))
                )}
              </ul>
              <Link href="/waterproofing" data-testid="link-waterproofing-more">
                <Button variant="outline" className="gap-2 text-blue-700 border-blue-200">
                  View All Services <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-700 rounded-md flex items-center justify-center">
                  <PaintBucket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Painting</h3>
                  <p className="text-sm text-gray-500">Premium finish painting</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {paintingServices.length > 0 ? paintingServices.map(s => (
                  <li key={s.id} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-sm">{s.title}</span>
                  </li>
                )) : (
                  ["Interior Painting", "Exterior Painting", "Texture Paint", "Waterproof Paint", "Building Painting"].map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-sm">{s}</span>
                    </li>
                  ))
                )}
              </ul>
              <Link href="/painting" data-testid="link-painting-more">
                <Button variant="outline" className="gap-2 text-blue-700 border-blue-200">
                  View All Services <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-before-after">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Before & After</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See the difference our professional work makes.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-lg overflow-hidden">
              <img src="/images/before-after-1.png" alt="Before and after waterproofing" className="w-full h-auto" data-testid="img-before-after" />
            </div>
          </div>
        </div>
      </section>

      {reviews && reviews.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50" data-testid="section-reviews">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Customer Reviews</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">What our customers say about our work.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.filter(r => r.approved).slice(0, 6).map((review) => (
                <Card key={review.id} className="bg-white border-blue-100" data-testid={`card-review-${review.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">"{review.review}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-semibold text-sm">{review.customerName[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-blue-900 text-sm">{review.customerName}</p>
                        {review.location && <p className="text-gray-500 text-xs">{review.location}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-20 bg-blue-700" data-testid="section-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Protect Your Home?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Get a free inspection and estimate. Our experts will visit your property and provide the best solution.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:9175193882" data-testid="button-cta-call">
              <Button size="lg" className="bg-white text-blue-700 gap-2 text-base px-6">
                <Phone className="w-5 h-5" />
                Call: 9175193882
              </Button>
            </a>
            <a href="https://wa.me/919175193882" target="_blank" rel="noopener noreferrer" data-testid="button-cta-whatsapp">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/40 text-white gap-2 text-base px-6">
                <SiWhatsapp className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
