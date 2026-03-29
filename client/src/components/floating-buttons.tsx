import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3" data-testid="floating-buttons">
      <a
        href="https://wa.me/919175193882?text=Hi%2C%20I%20need%20waterproofing%2Fpainting%20service.%20Please%20contact%20me."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        data-testid="button-whatsapp-floating"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7 text-white" />
      </a>
      <a
        href="tel:9175193882"
        className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        data-testid="button-call-floating"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
