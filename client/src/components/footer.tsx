import { Link } from "wouter";
import { Droplets, Phone, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-white text-base block">RAIN GUARD</span>
                <span className="text-xs text-blue-300 tracking-wide">WATERPROOFING & PAINTING</span>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Mumbai's trusted waterproofing and painting experts. Protecting your home from leakage since 2014.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/waterproofing", label: "Waterproofing Services" },
                { href: "/painting", label: "Painting Services" },
                { href: "/gallery", label: "Project Gallery" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-blue-200 text-sm cursor-pointer transition-colors" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Services</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>Terrace Waterproofing</li>
              <li>Bathroom Leakage Repair</li>
              <li>Interior Painting</li>
              <li>Exterior Painting</li>
              <li>Texture & Designer Paint</li>
              <li>Wall Crack Repair</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <a href="tel:9175193882" className="text-blue-200 text-sm" data-testid="link-footer-phone">9175193882</a>
              </li>
              <li className="flex items-start gap-3">
                <SiWhatsapp className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <a href="https://wa.me/919175193882" target="_blank" rel="noopener noreferrer" className="text-blue-200 text-sm" data-testid="link-footer-whatsapp">WhatsApp Us</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <a href="mailto:rainguardwaterproofing@gmail.com" className="text-blue-200 text-sm break-all" data-testid="link-footer-email">rainguardwaterproofing@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-blue-200 text-sm">Grd Floor, Damooshet Chawl, Dharavi Main Road, Mumbai - 400017</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-blue-300 text-xs">
          <p>2024 Rain Guard Waterproofing & Painting. All rights reserved.</p>
          <p>Mumbai's Trusted Waterproofing Experts</p>
        </div>
      </div>
    </footer>
  );
}
