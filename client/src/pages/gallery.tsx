import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, X } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";
import type { GalleryImage } from "@shared/schema";

export default function Gallery() {
  usePageTitle("Projects Gallery - Rain Guard Mumbai", "Browse our portfolio of completed waterproofing and painting projects across Mumbai.");
  const { data: images, isLoading } = useQuery<GalleryImage[]>({ queryKey: ["/api/gallery"] });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", "waterproofing", "painting", "before-after"];
  const filteredImages = filter === "all" ? images : images?.filter(img => img.category === filter);

  return (
    <div>
      <section className="relative py-20 sm:py-24" data-testid="section-gallery-hero">
        <div className="absolute inset-0">
          <img src="/images/mumbai-skyline.png" alt="Mumbai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-blue-800/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-1.5 mb-4">
            <Camera className="w-4 h-4 text-blue-300" />
            <span className="text-blue-200 text-sm font-medium">Our Work</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-gallery-title">Projects Gallery</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Browse our portfolio of completed waterproofing and painting projects across Mumbai.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-gallery-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className={filter === cat ? "bg-blue-700 text-white" : "text-blue-700 border-blue-200"}
                data-testid={`button-filter-${cat}`}
              >
                {cat === "all" ? "All Projects" : cat === "before-after" ? "Before & After" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-md animate-pulse" />
              ))}
            </div>
          ) : filteredImages && filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square rounded-md overflow-hidden cursor-pointer"
                  data-testid={`gallery-image-${image.id}`}
                >
                  <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/40 transition-colors flex items-end">
                    <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-medium truncate">{image.title}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500">No images in this category yet</h3>
              <p className="text-gray-400 text-sm mt-1">Check back soon for project updates.</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          {selectedImage && (
            <div>
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full h-auto max-h-[80vh] object-contain" />
              <div className="p-4 bg-black/80 text-white">
                <h3 className="font-medium">{selectedImage.title}</h3>
                <p className="text-sm text-gray-400 capitalize">{selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
