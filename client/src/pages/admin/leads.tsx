import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Phone, Users, Calendar } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { Lead } from "@shared/schema";

export default function AdminLeads() {
  const { toast } = useToast();
  const { data: leads, isLoading } = useQuery<Lead[]>({ queryKey: ["/api/admin/leads"] });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/leads/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Status updated" });
    },
  });

  return (
    <div data-testid="page-admin-leads">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{leads?.length || 0} total enquiries</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white border rounded-lg p-4 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : leads && leads.length > 0 ? (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5" data-testid={`lead-card-${lead.id}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === "new" ? "bg-green-100 text-green-700" :
                      lead.status === "contacted" ? "bg-blue-100 text-blue-700" :
                      lead.status === "done" ? "bg-gray-100 text-gray-600" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Phone:</span> {lead.phone}</p>
                    <p><span className="font-medium">Service:</span> <span className="capitalize">{lead.serviceNeeded.replace(/-/g, ' ')}</span></p>
                    <p><span className="font-medium">Location:</span> {lead.location}</p>
                    {lead.message && <p><span className="font-medium">Message:</span> {lead.message}</p>}
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <a href={`tel:${lead.phone}`} data-testid={`button-call-lead-${lead.id}`}>
                    <Button size="sm" className="bg-blue-700 text-white gap-1">
                      <Phone className="w-3 h-3" /> Call
                    </Button>
                  </a>
                  <a href={`https://wa.me/91${lead.phone}`} target="_blank" rel="noopener noreferrer" data-testid={`button-whatsapp-lead-${lead.id}`}>
                    <Button size="sm" variant="outline" className="gap-1 text-green-700 border-green-300">
                      <SiWhatsapp className="w-3 h-3" /> WhatsApp
                    </Button>
                  </a>
                  <Select
                    value={lead.status}
                    onValueChange={(status) => updateStatusMutation.mutate({ id: lead.id, status })}
                  >
                    <SelectTrigger className="w-32 h-8 text-xs" data-testid={`select-status-${lead.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">No leads yet</h3>
          <p className="text-gray-400 text-sm mt-1">Customer enquiries will appear here.</p>
        </div>
      )}
    </div>
  );
}
