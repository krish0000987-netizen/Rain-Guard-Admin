import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Target, Heart, Phone, Shield, Award, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { usePageTitle } from "@/hooks/use-page-title";

export default function About() {
  usePageTitle("About Us - Rain Guard Waterproofing & Painting", "Mumbai's trusted waterproofing and painting service provider. 10+ years experience, 1000+ projects.");
  return (
    <div>
      <section className="relative py-20 sm:py-24" data-testid="section-about-hero">
        <div className="absolute inset-0">
          <img src="/images/team-photo.png" alt="Our team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-blue-800/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4" data-testid="text-about-title">About Rain Guard</h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Mumbai's trusted waterproofing and painting service provider with expert team, modern equipment, and warranty on all work.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-about-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Rain Guard Waterproofing & Painting was founded with a single mission - to protect every home in Mumbai from leakage and water damage. Over the past 10+ years, we have grown into one of the most trusted names in the waterproofing and painting industry.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our team of skilled workers uses the latest techniques and high-quality chemicals to deliver permanent solutions. We believe in honest pricing, fast work, and clean finish - values that have earned us the trust of over 1000 homeowners across Mumbai.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Skilled Workers" },
                  { icon: Heart, label: "Honest Pricing" },
                  { icon: Clock, label: "Fast Work" },
                  { icon: Award, label: "Clean Finish" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-md" data-testid={`about-value-${i}`}>
                    <item.icon className="w-5 h-5 text-blue-700 shrink-0" />
                    <span className="text-sm font-medium text-blue-900">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="/images/team-photo.png" alt="Rain Guard team" className="rounded-lg w-full" />
              <div className="absolute -bottom-4 -right-4 bg-blue-700 text-white rounded-lg p-6 shadow-lg hidden sm:block">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm text-blue-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-blue-50" data-testid="section-about-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-blue-700" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            To protect every home from leakage and provide the highest quality waterproofing and painting services at affordable prices. We aim to be Mumbai's most trusted name in home protection.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Why We Stand Out</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "10+", label: "Years of Experience", icon: Clock },
              { value: "1000+", label: "Projects Completed", icon: Award },
              { value: "5 Year", label: "Service Warranty", icon: Shield },
              { value: "100%", label: "Customer Satisfaction", icon: Heart },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-blue-50 rounded-lg" data-testid={`stat-${i}`}>
                <stat.icon className="w-8 h-8 text-blue-700 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-700 mb-1">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-blue-700" data-testid="section-about-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Want to Work With Us?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Contact us today for a free inspection and estimate.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:9175193882" data-testid="button-about-call">
              <Button size="lg" className="bg-white text-blue-700 gap-2">
                <Phone className="w-5 h-5" /> Call Now
              </Button>
            </a>
            <Link href="/contact" data-testid="button-about-contact">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/40 text-white gap-2">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
