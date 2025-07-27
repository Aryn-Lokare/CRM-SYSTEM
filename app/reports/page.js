"use client";

import { useState } from "react";
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
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const salesData = [
  { month: "Jan", sales: 40000, leads: 45, deals: 12 },
  { month: "Feb", sales: 52000, leads: 52, deals: 15 },
  { month: "Mar", sales: 38000, leads: 38, deals: 10 },
  { month: "Apr", sales: 65000, leads: 65, deals: 18 },
  { month: "May", sales: 72000, leads: 72, deals: 20 },
  { month: "Jun", sales: 85000, leads: 85, deals: 25 },
];

const leadSources = [
  { name: "Website", value: 35, color: "#3B82F6" },
  { name: "LinkedIn", value: 25, color: "#10B981" },
  { name: "Referral", value: 20, color: "#F59E0B" },
  { name: "Cold Call", value: 15, color: "#EF4444" },
  { name: "Trade Show", value: 5, color: "#8B5CF6" },
];

const dealStages = [
  { name: "Prospecting", value: 15, color: "#3B82F6" },
  { name: "Qualification", value: 25, color: "#10B981" },
  { name: "Proposal", value: 20, color: "#F59E0B" },
  { name: "Negotiation", value: 30, color: "#EF4444" },
  { name: "Closed Won", value: 10, color: "#8B5CF6" },
];

const performanceData = [
  { name: "John Doe", deals: 15, revenue: 125000, conversion: 23 },
  { name: "Jane Smith", deals: 12, revenue: 98000, conversion: 19 },
  { name: "Mike Johnson", deals: 8, revenue: 65000, conversion: 15 },
  { name: "Sarah Wilson", deals: 10, revenue: 82000, conversion: 18 },
];

const topDeals = [
  {
    title: "Enterprise Software License",
    amount: 50000,
    stage: "Negotiation",
    rep: "John Doe",
  },
  {
    title: "Sales Automation Platform",
    amount: 35000,
    stage: "Proposal",
    rep: "Jane Smith",
  },
  {
    title: "Cloud Infrastructure Setup",
    amount: 75000,
    stage: "Closed Won",
    rep: "John Doe",
  },
  {
    title: "Marketing Automation Suite",
    amount: 28000,
    stage: "Qualification",
    rep: "Mike Johnson",
  },
  {
    title: "Growth Consulting Services",
    amount: 42000,
    stage: "Prospecting",
    rep: "Sarah Wilson",
  },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("sales");

  const totalRevenue = salesData.reduce((sum, month) => sum + month.sales, 0);
  const totalLeads = salesData.reduce((sum, month) => sum + month.leads, 0);
  const totalDeals = salesData.reduce((sum, month) => sum + month.deals, 0);
  const avgDealSize = totalRevenue / totalDeals;

  const getMetricData = () => {
    switch (selectedMetric) {
      case "sales":
        return salesData.map((item) => ({
          month: item.month,
          value: item.sales,
        }));
      case "leads":
        return salesData.map((item) => ({
          month: item.month,
          value: item.leads,
        }));
      case "deals":
        return salesData.map((item) => ({
          month: item.month,
          value: item.deals,
        }));
      default:
        return salesData.map((item) => ({
          month: item.month,
          value: item.sales,
        }));
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case "sales":
        return "Sales Revenue";
      case "leads":
        return "New Leads";
      case "deals":
        return "Closed Deals";
      default:
        return "Sales Revenue";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Track your business performance and insights
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="ytd">Year to Date</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Deals</p>
              <p className="text-2xl font-bold text-gray-900">{totalDeals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(avgDealSize)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Performance Trends
            </h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="sales">Sales Revenue</option>
              <option value="leads">New Leads</option>
              <option value="deals">Closed Deals</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={getMetricData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  selectedMetric === "sales" ? formatCurrency(value) : value
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Lead Sources
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadSources}
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
                {leadSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Stages */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Deal Pipeline
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dealStages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Sales Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue" ? formatCurrency(value) : value,
                  name === "revenue"
                    ? "Revenue"
                    : name === "deals"
                    ? "Deals"
                    : "Conversion %",
                ]}
              />
              <Bar dataKey="deals" fill="#10B981" />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Deals */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Deals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Rep
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topDeals.map((deal, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {deal.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(deal.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        deal.stage === "Closed Won"
                          ? "bg-green-100 text-green-800"
                          : deal.stage === "Negotiation"
                          ? "bg-orange-100 text-orange-800"
                          : deal.stage === "Proposal"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {deal.rep}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Conversion Funnel
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">357</div>
            <div className="text-sm text-gray-600">Leads</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">89</div>
            <div className="text-sm text-gray-600">Qualified</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">45</div>
            <div className="text-sm text-gray-600">Proposals</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <div className="text-sm text-gray-600">Closed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
