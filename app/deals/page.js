"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

const mockDeals = [
  {
    id: "1",
    title: "Enterprise Software License",
    amount: 50000,
    stage: "Prospecting",
    probability: 20,
    closeDate: new Date("2024-03-15"),
    description: "Large enterprise software license deal",
    assignedTo: "John Doe",
    contactId: "1",
    accountId: "1",
    createdAt: new Date("2024-01-15"),
    contact: { firstName: "John", lastName: "Smith", company: "TechCorp" },
    account: { name: "TechCorp" },
  },
  {
    id: "2",
    title: "Sales Automation Platform",
    amount: 25000,
    stage: "Qualification",
    probability: 40,
    closeDate: new Date("2024-02-28"),
    description: "Sales automation platform implementation",
    assignedTo: "Jane Smith",
    contactId: "2",
    accountId: "2",
    createdAt: new Date("2024-01-14"),
    contact: {
      firstName: "Sarah",
      lastName: "Johnson",
      company: "Innovate Inc",
    },
    account: { name: "Innovate Inc" },
  },
  {
    id: "3",
    title: "Growth Consulting Services",
    amount: 15000,
    stage: "Proposal",
    probability: 60,
    closeDate: new Date("2024-02-15"),
    description: "Growth consulting and strategy services",
    assignedTo: "John Doe",
    contactId: "3",
    accountId: "3",
    createdAt: new Date("2024-01-13"),
    contact: { firstName: "Mike", lastName: "Davis", company: "StartupXYZ" },
    account: { name: "StartupXYZ" },
  },
  {
    id: "4",
    title: "Marketing Automation Suite",
    amount: 35000,
    stage: "Negotiation",
    probability: 80,
    closeDate: new Date("2024-01-30"),
    description: "Complete marketing automation solution",
    assignedTo: "Jane Smith",
    contactId: "2",
    accountId: "2",
    createdAt: new Date("2024-01-12"),
    contact: {
      firstName: "Sarah",
      lastName: "Johnson",
      company: "Innovate Inc",
    },
    account: { name: "Innovate Inc" },
  },
  {
    id: "5",
    title: "Cloud Infrastructure Setup",
    amount: 75000,
    stage: "Closed Won",
    probability: 100,
    closeDate: new Date("2024-01-20"),
    description: "Cloud infrastructure and migration services",
    assignedTo: "John Doe",
    contactId: "1",
    accountId: "1",
    createdAt: new Date("2024-01-10"),
    contact: { firstName: "John", lastName: "Smith", company: "TechCorp" },
    account: { name: "TechCorp" },
  },
];

const stages = [
  { name: "Prospecting", color: "bg-blue-100 text-blue-800", deals: [] },
  { name: "Qualification", color: "bg-yellow-100 text-yellow-800", deals: [] },
  { name: "Proposal", color: "bg-purple-100 text-purple-800", deals: [] },
  { name: "Negotiation", color: "bg-orange-100 text-orange-800", deals: [] },
  { name: "Closed Won", color: "bg-green-100 text-green-800", deals: [] },
  { name: "Closed Lost", color: "bg-red-100 text-red-800", deals: [] },
];

export default function DealsPage() {
  const [deals, setDeals] = useState(mockDeals);
  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    stage: "Prospecting",
    probability: 0,
    closeDate: "",
    description: "",
    contactId: "",
    accountId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDeal = {
      id: editingDeal ? editingDeal.id : Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
      probability: parseFloat(formData.probability),
      closeDate: formData.closeDate ? new Date(formData.closeDate) : null,
      assignedTo: "John Doe",
      createdAt: editingDeal ? editingDeal.createdAt : new Date(),
      updatedAt: new Date(),
      contact: { firstName: "John", lastName: "Smith", company: "TechCorp" },
      account: { name: "TechCorp" },
    };

    if (editingDeal) {
      setDeals(
        deals.map((deal) => (deal.id === editingDeal.id ? newDeal : deal))
      );
    } else {
      setDeals([newDeal, ...deals]);
    }

    setFormData({
      title: "",
      amount: "",
      stage: "Prospecting",
      probability: 0,
      closeDate: "",
      description: "",
      contactId: "",
      accountId: "",
    });
    setEditingDeal(null);
    setShowForm(false);
  };

  const handleEdit = (deal) => {
    setEditingDeal(deal);
    setFormData({
      title: deal.title,
      amount: deal.amount.toString(),
      stage: deal.stage,
      probability: deal.probability,
      closeDate: deal.closeDate
        ? deal.closeDate.toISOString().split("T")[0]
        : "",
      description: deal.description || "",
      contactId: deal.contactId || "",
      accountId: deal.accountId || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      setDeals(deals.filter((deal) => deal.id !== id));
    }
  };

  const handleStageChange = (dealId, newStage) => {
    setDeals(
      deals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );
  };

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact?.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      deal.contact?.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage = stageFilter === "All" || deal.stage === stageFilter;

    return matchesSearch && matchesStage;
  });

  // Group deals by stage
  const dealsByStage = stages.map((stage) => ({
    ...stage,
    deals: filteredDeals.filter((deal) => deal.stage === stage.name),
  }));

  const totalValue = deals.reduce((sum, deal) => sum + deal.amount, 0);
  const weightedValue = deals.reduce(
    (sum, deal) => sum + (deal.amount * deal.probability) / 100,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-gray-600">Track your sales pipeline</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Deal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Pipeline
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalValue)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Weighted Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(weightedValue)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-gray-900">{deals.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Stages</option>
            {stages.map((stage) => (
              <option key={stage.name} value={stage.name}>
                {stage.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Deal Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {editingDeal ? "Edit Deal" : "Add New Deal"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingDeal(null);
                setFormData({
                  title: "",
                  amount: "",
                  stage: "Prospecting",
                  probability: 0,
                  closeDate: "",
                  description: "",
                  contactId: "",
                  accountId: "",
                });
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount *
                </label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stage
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) =>
                    setFormData({ ...formData, stage: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {stages.map((stage) => (
                    <option key={stage.name} value={stage.name}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Probability (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) =>
                    setFormData({ ...formData, probability: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Close Date
                </label>
                <input
                  type="date"
                  value={formData.closeDate}
                  onChange={(e) =>
                    setFormData({ ...formData, closeDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingDeal(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingDeal ? "Update Deal" : "Add Deal"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pipeline View */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {dealsByStage.map((stage) => (
          <div key={stage.name} className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  {stage.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {stage.deals.length}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {stage.deals.map((deal) => (
                <div key={deal.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {deal.title}
                    </h4>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(deal)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(deal.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {deal.description}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      {formatCurrency(deal.amount)}
                    </span>
                    <span className="text-gray-500">{deal.probability}%</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Move to:</div>
                    <div className="flex flex-wrap gap-1">
                      {stages
                        .filter((s) => s.name !== stage.name)
                        .map((nextStage) => (
                          <button
                            key={nextStage.name}
                            onClick={() =>
                              handleStageChange(deal.id, nextStage.name)
                            }
                            className="text-xs px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                          >
                            {nextStage.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
