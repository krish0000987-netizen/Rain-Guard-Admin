import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Droplets, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/waterproofing", label: "Waterproofing" },
  { href: "/painting", label: "Painting" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100" data-testid="header-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo">
            <div className="w-10 h-10 bg-blue-700 rounded-md flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-blue-900 text-sm sm:text-base block">RAIN GUARD</span>
              <span className="text-[10px] sm:text-xs text-blue-600 tracking-wide">WATERPROOFING & PAINTING</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                <span
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    location === item.href
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="tel:9175193882" className="hidden sm:inline-flex" data-testid="button-call-header">
              <Button size="sm" className="bg-blue-700 text-white gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">Call Now</span>
              </Button>
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white p-0">
                <div className="flex items-center justify-between p-4 border-b border-blue-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-blue-900 text-sm">RAIN GUARD</span>
                  </div>
                </div>
                <nav className="flex flex-col p-4 gap-1" data-testid="nav-mobile">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                      <span
                        className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                          location === item.href
                            ? "text-blue-700 bg-blue-50"
                            : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t border-blue-100">
                  <a href="tel:9175193882" data-testid="button-call-mobile">
                    <Button className="w-full bg-blue-700 text-white gap-2">
                      <Phone className="w-4 h-4" />
                      Call: 917-519-3882
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
