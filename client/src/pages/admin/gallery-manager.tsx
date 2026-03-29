import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Plus, Trash2, ImageIcon, Upload } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

export default function AdminGalleryManager() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("waterproofing");
  const [isBefore, setIsBefore] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: images, isLoading } = useQuery<GalleryImage[]>({ queryKey: ["/api/admin/gallery"] });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error("No file selected");
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("isBefore", String(isBefore));
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Upload failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Image uploaded successfully" });
      resetForm();
      setOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Image deleted" });
    },
  });

  const resetForm = () => {
    setTitle("");
    setCategory("waterproofing");
    setIsBefore(false);
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div data-testid="page-admin-gallery">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Gallery Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Upload and manage project gallery images</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-700 text-white gap-2" data-testid="button-add-image">
              <Plus className="w-4 h-4" /> Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle>Upload Gallery Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Image File</Label>
                <div
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="dropzone-image"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-md object-contain" data-testid="img-preview" />
                  ) : (
                    <div className="text-gray-400">
                      <Upload className="w-10 h-10 mx-auto mb-2" />
                      <p className="text-sm font-medium">Click to select an image</p>
                      <p className="text-xs mt-1">JPG, PNG, WebP or GIF up to 10MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleFileChange}
                  data-testid="input-file-image"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="e.g., Terrace Waterproofing - Andheri"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                  data-testid="input-image-title"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1" data-testid="select-image-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waterproofing">Waterproofing</SelectItem>
                    <SelectItem value="painting">Painting</SelectItem>
                    <SelectItem value="before-after">Before & After</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={isBefore} onCheckedChange={setIsBefore} data-testid="switch-is-before" />
                <Label>Before photo (for before & after comparison)</Label>
              </div>
              <Button
                className="w-full bg-blue-700 text-white"
                disabled={!selectedFile || !title || uploadMutation.isPending}
                onClick={() => uploadMutation.mutate()}
                data-testid="button-upload-image"
              >
                {uploadMutation.isPending ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white border rounded-lg aspect-square animate-pulse" />
          ))}
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden group relative" data-testid={`gallery-item-${image.id}`}>
              <div className="aspect-square">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  data-testid={`img-gallery-${image.id}`}
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm truncate" data-testid={`text-gallery-title-${image.id}`}>{image.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize">{image.category}</span>
                  {image.isBefore && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Before</span>}
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() => deleteMutation.mutate(image.id)}
                  data-testid={`button-delete-image-${image.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">No gallery images yet</h3>
          <p className="text-gray-400 text-sm mt-1">Upload your first project photo to get started.</p>
        </div>
      )}
    </div>
  );
}
