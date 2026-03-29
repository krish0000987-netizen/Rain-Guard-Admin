import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Image, Star, TrendingUp, Phone } from "lucide-react";
import type { Lead } from "@shared/schema";

export default function AdminDashboard() {
  const { data: leads } = useQuery<Lead[]>({ queryKey: ["/api/admin/leads"] });

  const totalLeads = leads?.length || 0;
  const newLeads = leads?.filter(l => l.status === "new").length || 0;
  const todayLeads = leads?.filter(l => {
    const today = new Date().toDateString();
    return new Date(l.createdAt).toDateString() === today;
  }).length || 0;

  return (
    <div data-testid="page-admin-dashboard">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to Rain Guard Admin Panel</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, label: "Total Leads", value: totalLeads, color: "bg-blue-100 text-blue-700" },
          { icon: TrendingUp, label: "New Leads", value: newLeads, color: "bg-green-100 text-green-700" },
          { icon: Phone, label: "Today's Leads", value: todayLeads, color: "bg-purple-100 text-purple-700" },
          { icon: Star, label: "Avg. Rating", value: "4.8", color: "bg-yellow-100 text-yellow-700" },
        ].map((stat, i) => (
          <Card key={i} className="border-gray-200" data-testid={`card-stat-${i}`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-bold text-blue-900 mb-4">Recent Leads</h2>
        {leads && leads.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="table-recent-leads">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-600">Name</th>
                    <th className="text-left p-3 font-medium text-gray-600">Phone</th>
                    <th className="text-left p-3 font-medium text-gray-600 hidden sm:table-cell">Service</th>
                    <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Location</th>
                    <th className="text-left p-3 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 10).map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 last:border-0" data-testid={`row-lead-${lead.id}`}>
                      <td className="p-3 font-medium text-gray-900">{lead.name}</td>
                      <td className="p-3">
                        <a href={`tel:${lead.phone}`} className="text-blue-700">{lead.phone}</a>
                      </td>
                      <td className="p-3 text-gray-600 hidden sm:table-cell capitalize">{lead.serviceNeeded.replace(/-/g, ' ')}</td>
                      <td className="p-3 text-gray-600 hidden md:table-cell">{lead.location}</td>
                      <td className="p-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          lead.status === "new" ? "bg-green-100 text-green-700" :
                          lead.status === "contacted" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No leads yet. They'll appear here when customers submit enquiries.</p>
          </div>
        )}
      </div>
    </div>
  );
}
