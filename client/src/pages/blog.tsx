import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({ queryKey: ["/api/blog"] });

  return (
    <div>
      <section className="relative py-20 sm:py-24" data-testid="section-blog-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-1.5 mb-4">
            <BookOpen className="w-4 h-4 text-blue-300" />
            <span className="text-blue-200 text-sm font-medium">Expert Tips & Guides</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-blog-title">Blog</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Expert tips, guides, and advice on waterproofing and painting for your home.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-blog-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <Card key={i} className="animate-pulse border-blue-100">
                  <CardContent className="p-0">
                    <div className="h-48 bg-gray-200 rounded-t-lg" />
                    <div className="p-6">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-100 rounded w-5/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.filter(p => p.published).map((post) => (
                <Card key={post.id} className="group border-blue-100 transition-shadow hover:shadow-md" data-testid={`card-blog-${post.id}`}>
                  <CardContent className="p-0">
                    {post.image && (
                      <div className="h-48 overflow-hidden rounded-t-lg">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
                      </div>
                      <h3 className="font-bold text-blue-900 text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} data-testid={`link-blog-read-${post.id}`}>
                        <Button variant="outline" size="sm" className="gap-2 text-blue-700 border-blue-200">
                          Read More <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500">No blog posts yet</h3>
              <p className="text-gray-400 text-sm mt-1">Check back soon for expert tips and guides.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
