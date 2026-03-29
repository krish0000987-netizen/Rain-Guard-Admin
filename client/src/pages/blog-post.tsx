import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = useQuery<BlogPost>({ queryKey: ["/api/blog", params.slug] });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link href="/blog">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-blue-900 py-12 sm:py-16" data-testid="section-blog-post-header">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" data-testid="link-back-blog">
            <Button variant="outline" size="sm" className="gap-2 mb-6 bg-white/10 border-white/30 text-white">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-blog-post-title">{post.title}</h1>
          <div className="flex items-center gap-2 text-blue-200 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
          </div>
        </div>
      </section>

      <article className="py-12 sm:py-16 bg-white" data-testid="section-blog-post-content">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.image && (
            <img src={post.image} alt={post.title} className="w-full rounded-lg mb-8" />
          )}
          <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>
      </article>

      <section className="py-12 sm:py-16 bg-blue-50" data-testid="section-blog-post-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">Need Professional Help?</h2>
          <p className="text-gray-600 mb-6">Contact Rain Guard for expert waterproofing and painting services in Mumbai.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:9175193882" data-testid="button-blog-call">
              <Button className="bg-blue-700 text-white gap-2">
                <Phone className="w-4 h-4" /> Call: 9175193882
              </Button>
            </a>
            <a href="https://wa.me/919175193882" target="_blank" rel="noopener noreferrer" data-testid="button-blog-whatsapp">
              <Button variant="outline" className="gap-2 text-green-700 border-green-300">
                <SiWhatsapp className="w-4 h-4" /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
