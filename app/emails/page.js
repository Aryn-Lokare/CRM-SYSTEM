"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Send,
  Mail,
  Inbox,
  Sent,
  Draft,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const mockEmails = [
  {
    id: "1",
    subject: "Follow up on our meeting",
    body: "Hi John, I wanted to follow up on our meeting last week. I think we have a great opportunity to work together on your enterprise solution needs. Let me know when you're available for a call.",
    from: "john.doe@company.com",
    to: ["john.smith@techcorp.com"],
    cc: [],
    bcc: [],
    status: "Sent",
    sentAt: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2024-01-15T10:25:00"),
    assignedTo: "John Doe",
    contactId: "1",
    contact: { firstName: "John", lastName: "Smith", company: "TechCorp" },
  },
  {
    id: "2",
    subject: "Proposal for Sales Automation Platform",
    body: "Dear Sarah, Thank you for your interest in our sales automation platform. I've attached our detailed proposal outlining the implementation plan and pricing. Please let me know if you have any questions.",
    from: "jane.smith@company.com",
    to: ["sarah.j@innovate.com"],
    cc: ["manager@innovate.com"],
    bcc: [],
    status: "Draft",
    sentAt: null,
    createdAt: new Date("2024-01-14T14:20:00"),
    assignedTo: "Jane Smith",
    contactId: "2",
    contact: {
      firstName: "Sarah",
      lastName: "Johnson",
      company: "Innovate Inc",
    },
  },
  {
    id: "3",
    subject: "Welcome to our platform",
    body: "Hi Mike, Welcome to our platform! I'm excited to help you get started with our growth solutions. Here's a quick overview of what we can offer...",
    from: "john.doe@company.com",
    to: ["mike.davis@startup.com"],
    cc: [],
    bcc: [],
    status: "Sent",
    sentAt: new Date("2024-01-13T09:15:00"),
    createdAt: new Date("2024-01-13T09:10:00"),
    assignedTo: "John Doe",
    contactId: "3",
    contact: { firstName: "Mike", lastName: "Davis", company: "StartupXYZ" },
  },
];

const contacts = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@techcorp.com",
    company: "TechCorp",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@innovate.com",
    company: "Innovate Inc",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@startup.com",
    company: "StartupXYZ",
  },
];

export default function EmailsPage() {
  const [emails, setEmails] = useState(mockEmails);
  const [showCompose, setShowCompose] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("inbox");

  const [composeData, setComposeData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });

  const handleSendEmail = (e) => {
    e.preventDefault();
    const newEmail = {
      id: Date.now().toString(),
      ...composeData,
      from: "john.doe@company.com",
      to: composeData.to.split(",").map((email) => email.trim()),
      cc: composeData.cc
        ? composeData.cc.split(",").map((email) => email.trim())
        : [],
      bcc: composeData.bcc
        ? composeData.bcc.split(",").map((email) => email.trim())
        : [],
      status: "Sent",
      sentAt: new Date(),
      createdAt: new Date(),
      assignedTo: "John Doe",
      contactId: "1",
      contact: { firstName: "John", lastName: "Smith", company: "TechCorp" },
    };

    setEmails([newEmail, ...emails]);
    setComposeData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
    });
    setShowCompose(false);
  };

  const handleSaveDraft = () => {
    const draftEmail = {
      id: Date.now().toString(),
      ...composeData,
      from: "john.doe@company.com",
      to: composeData.to
        ? composeData.to.split(",").map((email) => email.trim())
        : [],
      cc: composeData.cc
        ? composeData.cc.split(",").map((email) => email.trim())
        : [],
      bcc: composeData.bcc
        ? composeData.bcc.split(",").map((email) => email.trim())
        : [],
      status: "Draft",
      sentAt: null,
      createdAt: new Date(),
      assignedTo: "John Doe",
      contactId: "1",
      contact: { firstName: "John", lastName: "Smith", company: "TechCorp" },
    };

    setEmails([draftEmail, ...emails]);
    setComposeData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
    });
    setShowCompose(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this email?")) {
      setEmails(emails.filter((email) => email.id !== id));
    }
  };

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.to.some((to) =>
        to.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "All" || email.status === statusFilter;

    let matchesTab = true;
    if (activeTab === "inbox") {
      matchesTab = email.status === "Received" || email.status === "Sent";
    } else if (activeTab === "sent") {
      matchesTab = email.status === "Sent";
    } else if (activeTab === "drafts") {
      matchesTab = email.status === "Draft";
    }

    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Sent":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Received":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Emails</h1>
          <p className="text-gray-600">Manage your email communications</p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Compose
        </button>
      </div>

      {/* Email Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("inbox")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "inbox"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Inbox className="h-4 w-4 inline mr-2" />
              Inbox
            </button>
            <button
              onClick={() => setActiveTab("sent")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "sent"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Sent className="h-4 w-4 inline mr-2" />
              Sent
            </button>
            <button
              onClick={() => setActiveTab("drafts")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "drafts"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Draft className="h-4 w-4 inline mr-2" />
              Drafts
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Sent">Sent</option>
              <option value="Draft">Draft</option>
              <option value="Received">Received</option>
            </select>
          </div>
        </div>

        {/* Email List */}
        <div className="divide-y divide-gray-200">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {email.subject}
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          email.status
                        )}`}
                      >
                        {email.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      To: {email.to.join(", ")}
                    </p>
                    <p className="text-sm text-gray-400">
                      {email.status === "Sent"
                        ? formatDateTime(email.sentAt)
                        : formatDateTime(email.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEmail(email);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(email.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Compose Email
              </h3>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To *
                </label>
                <input
                  type="email"
                  required
                  value={composeData.to}
                  onChange={(e) =>
                    setComposeData({ ...composeData, to: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="recipient@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CC
                </label>
                <input
                  type="email"
                  value={composeData.cc}
                  onChange={(e) =>
                    setComposeData({ ...composeData, cc: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="cc@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BCC
                </label>
                <input
                  type="email"
                  value={composeData.bcc}
                  onChange={(e) =>
                    setComposeData({ ...composeData, bcc: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="bcc@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={composeData.subject}
                  onChange={(e) =>
                    setComposeData({ ...composeData, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  value={composeData.body}
                  onChange={(e) =>
                    setComposeData({ ...composeData, body: e.target.value })
                  }
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Email Details
              </h3>
              <button
                onClick={() => setSelectedEmail(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedEmail.subject}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedEmail.from}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedEmail.to.join(", ")}
                </p>
              </div>
              {selectedEmail.cc.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CC
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedEmail.cc.join(", ")}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    selectedEmail.status
                  )}`}
                >
                  {selectedEmail.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedEmail.status === "Sent"
                    ? formatDateTime(selectedEmail.sentAt)
                    : formatDateTime(selectedEmail.createdAt)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedEmail.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
