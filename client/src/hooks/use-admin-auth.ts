import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { getQueryFn } from "@/lib/queryClient";

export function useAdminAuth() {
  const { data, isLoading, error } = useQuery<{ adminId: number; role: string } | null>({
    queryKey: ["/api/admin/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
    staleTime: 30000,
  });
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/admin");
    }
  }, [isLoading, data, navigate]);

  return { admin: data, isLoading, isAuthenticated: !!data };
}
