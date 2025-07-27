"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Building2,
  Globe,
  Phone,
  MapPin,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const mockAccounts = [
  {
    id: "1",
    name: "TechCorp",
    industry: "Technology",
    website: "https://techcorp.com",
    phone: "+1-555-0123",
    address: "123 Innovation Drive",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "USA",
    notes:
      "Large enterprise technology company, key decision makers identified",
    assignedTo: "John Doe",
    createdAt: new Date("2024-01-15"),
    contacts: [
      {
        id: "1",
        name: "John Smith",
        email: "john.smith@techcorp.com",
        position: "CTO",
      },
      {
        id: "2",
        name: "Sarah Wilson",
        email: "sarah.w@techcorp.com",
        position: "VP Sales",
      },
    ],
    deals: [
      {
        id: "1",
        title: "Enterprise Software License",
        amount: 50000,
        stage: "Prospecting",
      },
    ],
  },
  {
    id: "2",
    name: "Innovate Inc",
    industry: "Software",
    website: "https://innovate.com",
    phone: "+1-555-0456",
    address: "456 Business Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    notes: "Growing software company, interested in automation solutions",
    assignedTo: "Jane Smith",
    createdAt: new Date("2024-01-14"),
    contacts: [
      {
        id: "3",
        name: "Sarah Johnson",
        email: "sarah.j@innovate.com",
        position: "VP Sales",
      },
    ],
    deals: [
      {
        id: "2",
        title: "Sales Automation Platform",
        amount: 25000,
        stage: "Qualification",
      },
    ],
  },
  {
    id: "3",
    name: "StartupXYZ",
    industry: "Startup",
    website: "https://startupxyz.com",
    phone: "+1-555-0789",
    address: "789 Innovation Drive",
    city: "Austin",
    state: "TX",
    zipCode: "73301",
    country: "USA",
    notes: "Early-stage startup looking for growth solutions",
    assignedTo: "John Doe",
    createdAt: new Date("2024-01-13"),
    contacts: [
      {
        id: "4",
        name: "Mike Davis",
        email: "mike.davis@startup.com",
        position: "Founder",
      },
    ],
    deals: [
      {
        id: "3",
        title: "Growth Consulting Services",
        amount: 15000,
        stage: "Proposal",
      },
    ],
  },
];

const industries = [
  "Technology",
  "Software",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Startup",
  "Consulting",
  "Other",
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = {
      id: editingAccount ? editingAccount.id : Date.now().toString(),
      ...formData,
      assignedTo: "John Doe",
      createdAt: editingAccount ? editingAccount.createdAt : new Date(),
      contacts: editingAccount ? editingAccount.contacts : [],
      deals: editingAccount ? editingAccount.deals : [],
    };

    if (editingAccount) {
      setAccounts(
        accounts.map((account) =>
          account.id === editingAccount.id ? newAccount : account
        )
      );
    } else {
      setAccounts([newAccount, ...accounts]);
    }

    setFormData({
      name: "",
      industry: "",
      website: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      notes: "",
    });
    setEditingAccount(null);
    setShowForm(false);
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      industry: account.industry || "",
      website: account.website || "",
      phone: account.phone || "",
      address: account.address || "",
      city: account.city || "",
      state: account.state || "",
      zipCode: account.zipCode || "",
      country: account.country || "",
      notes: account.notes || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this account?")) {
      setAccounts(accounts.filter((account) => account.id !== id));
    }
  };

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.city?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      industryFilter === "All" || account.industry === industryFilter;

    return matchesSearch && matchesIndustry;
  });

  const totalAccounts = accounts.length;
  const totalContacts = accounts.reduce(
    (sum, account) => sum + account.contacts.length,
    0
  );
  const totalDeals = accounts.reduce(
    (sum, account) => sum + account.deals.length,
    0
  );
  const totalValue = accounts.reduce(
    (sum, account) =>
      sum + account.deals.reduce((dealSum, deal) => dealSum + deal.amount, 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600">Manage your company accounts</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Account
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Accounts
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalAccounts}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Contacts
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalContacts}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Phone className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-gray-900">{totalDeals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pipeline Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalValue.toLocaleString()}
              </p>
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
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Account Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {editingAccount ? "Edit Account" : "Add New Account"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingAccount(null);
                setFormData({
                  name: "",
                  industry: "",
                  website: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "",
                  notes: "",
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
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
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
                  setEditingAccount(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingAccount ? "Update Account" : "Add Account"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Accounts List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            All Accounts ({filteredAccounts.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {account.name}
                      </div>
                      {account.website && (
                        <div className="text-sm text-blue-600">
                          <a
                            href={account.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {account.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {account.industry}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {account.phone && (
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone className="h-3 w-3 text-gray-400 mr-1" />
                          {account.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {account.city}, {account.state}
                    </div>
                    <div className="text-sm text-gray-500">
                      {account.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.contacts.length} contacts
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.deals.length} deals
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedAccount(account)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(account)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(account.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Detail Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedAccount.name}
              </h3>
              <button
                onClick={() => setSelectedAccount(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedAccount.industry}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <p className="text-sm text-blue-600 mt-1">
                    {selectedAccount.website ? (
                      <a
                        href={selectedAccount.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedAccount.website}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedAccount.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedAccount.address}, {selectedAccount.city},{" "}
                    {selectedAccount.state} {selectedAccount.zipCode}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedAccount.notes || "No notes"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contacts ({selectedAccount.contacts.length})
                </label>
                <div className="mt-2 space-y-2">
                  {selectedAccount.contacts.map((contact) => (
                    <div key={contact.id} className="p-2 bg-gray-50 rounded">
                      <div className="text-sm font-medium text-gray-900">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.position}
                      </div>
                      <div className="text-sm text-blue-600">
                        {contact.email}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deals ({selectedAccount.deals.length})
                </label>
                <div className="mt-2 space-y-2">
                  {selectedAccount.deals.map((deal) => (
                    <div key={deal.id} className="p-2 bg-gray-50 rounded">
                      <div className="text-sm font-medium text-gray-900">
                        {deal.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${deal.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-600">{deal.stage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
