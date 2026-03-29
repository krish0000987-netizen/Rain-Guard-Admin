import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FloatingButtons } from "@/components/floating-buttons";
import { AdminLayout } from "@/components/admin-layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Waterproofing from "@/pages/waterproofing";
import Painting from "@/pages/painting";
import Gallery from "@/pages/gallery";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminLeads from "@/pages/admin/leads";
import AdminServicesManager from "@/pages/admin/services-manager";
import AdminReviewsManager from "@/pages/admin/reviews-manager";
import AdminGalleryManager from "@/pages/admin/gallery-manager";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    if (location === "/admin" || location === "/admin/login") {
      return <AdminLogin />;
    }
    return (
      <AdminLayout>
        <Switch>
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/leads" component={AdminLeads} />
          <Route path="/admin/services" component={AdminServicesManager} />
          <Route path="/admin/reviews" component={AdminReviewsManager} />
          <Route path="/admin/gallery" component={AdminGalleryManager} />
          <Route component={NotFound} />
        </Switch>
      </AdminLayout>
    );
  }

  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/waterproofing" component={Waterproofing} />
        <Route path="/painting" component={Painting} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
