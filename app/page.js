"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Target,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 2000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
];

const dealStages = [
  { name: "Prospecting", value: 15, color: "#3B82F6" },
  { name: "Qualification", value: 25, color: "#10B981" },
  { name: "Proposal", value: 20, color: "#F59E0B" },
  { name: "Negotiation", value: 30, color: "#EF4444" },
  { name: "Closed", value: 10, color: "#8B5CF6" },
];

const recentActivities = [
  {
    id: 1,
    type: "lead",
    message: "New lead added: John Smith from TechCorp",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "deal",
    message: "Deal closed: $50,000 contract with ABC Corp",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "task",
    message: "Task completed: Follow up with potential client",
    time: "6 hours ago",
  },
  {
    id: 4,
    type: "email",
    message: "Email sent to 15 prospects",
    time: "1 day ago",
  },
];

const stats = [
  {
    name: "Total Leads",
    value: "1,234",
    change: "+12%",
    icon: Target,
    color: "text-blue-600",
  },
  {
    name: "Active Deals",
    value: "89",
    change: "+5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    name: "Total Revenue",
    value: "$2.4M",
    change: "+18%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    name: "Conversion Rate",
    value: "23%",
    change: "+2%",
    icon: Users,
    color: "text-orange-600",
  },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Sales Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Stages */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Deal Stages
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dealStages}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dealStages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Recent Activities
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {activity.type === "lead" && (
                      <Target className="h-5 w-5 text-blue-600" />
                    )}
                    {activity.type === "deal" && (
                      <DollarSign className="h-5 w-5 text-green-600" />
                    )}
                    {activity.type === "task" && (
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                    )}
                    {activity.type === "email" && (
                      <Calendar className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Target className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Lead</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Add Contact
            </span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Create Deal
            </span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
