"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete redesign of company website with modern UI/UX",
    status: "In Progress",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-15"),
    progress: 65,
    assignedTo: "John Doe",
    createdAt: new Date("2024-01-01"),
    tasks: [
      {
        id: "1",
        title: "Design mockups",
        status: "Completed",
        priority: "High",
        assignedTo: "John Doe",
        dueDate: new Date("2024-01-15"),
      },
      {
        id: "2",
        title: "Frontend development",
        status: "In Progress",
        priority: "High",
        assignedTo: "Jane Smith",
        dueDate: new Date("2024-02-15"),
      },
      {
        id: "3",
        title: "Backend integration",
        status: "To Do",
        priority: "Medium",
        assignedTo: "Mike Johnson",
        dueDate: new Date("2024-02-28"),
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "iOS and Android mobile application for customer engagement",
    status: "Planning",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-06-30"),
    progress: 25,
    assignedTo: "Jane Smith",
    createdAt: new Date("2024-01-15"),
    tasks: [
      {
        id: "4",
        title: "Requirements gathering",
        status: "Completed",
        priority: "High",
        assignedTo: "Jane Smith",
        dueDate: new Date("2024-01-30"),
      },
      {
        id: "5",
        title: "UI/UX design",
        status: "In Progress",
        priority: "High",
        assignedTo: "John Doe",
        dueDate: new Date("2024-02-15"),
      },
      {
        id: "6",
        title: "API development",
        status: "To Do",
        priority: "Medium",
        assignedTo: "Mike Johnson",
        dueDate: new Date("2024-03-01"),
      },
    ],
  },
  {
    id: "3",
    name: "CRM System Implementation",
    description: "Implement new CRM system for sales team",
    status: "Completed",
    startDate: new Date("2023-10-01"),
    endDate: new Date("2024-01-31"),
    progress: 100,
    assignedTo: "Mike Johnson",
    createdAt: new Date("2023-10-01"),
    tasks: [
      {
        id: "7",
        title: "System setup",
        status: "Completed",
        priority: "High",
        assignedTo: "Mike Johnson",
        dueDate: new Date("2023-10-15"),
      },
      {
        id: "8",
        title: "User training",
        status: "Completed",
        priority: "Medium",
        assignedTo: "Jane Smith",
        dueDate: new Date("2023-12-15"),
      },
      {
        id: "9",
        title: "Data migration",
        status: "Completed",
        priority: "High",
        assignedTo: "Mike Johnson",
        dueDate: new Date("2024-01-15"),
      },
    ],
  },
];

const statuses = [
  { name: "Planning", color: "bg-blue-100 text-blue-800" },
  { name: "In Progress", color: "bg-yellow-100 text-yellow-800" },
  { name: "Review", color: "bg-purple-100 text-purple-800" },
  { name: "Completed", color: "bg-green-100 text-green-800" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("kanban"); // 'kanban' or 'list'

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Planning",
    startDate: "",
    endDate: "",
    assignedTo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: editingProject ? editingProject.id : Date.now().toString(),
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate) : null,
      endDate: formData.endDate ? new Date(formData.endDate) : null,
      progress: 0,
      assignedTo: formData.assignedTo || "John Doe",
      createdAt: editingProject ? editingProject.createdAt : new Date(),
      tasks: editingProject ? editingProject.tasks : [],
    };

    if (editingProject) {
      setProjects(
        projects.map((project) =>
          project.id === editingProject.id ? newProject : project
        )
      );
    } else {
      setProjects([newProject, ...projects]);
    }

    setFormData({
      name: "",
      description: "",
      status: "Planning",
      startDate: "",
      endDate: "",
      assignedTo: "",
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      startDate: project.startDate
        ? project.startDate.toISOString().split("T")[0]
        : "",
      endDate: project.endDate
        ? project.endDate.toISOString().split("T")[0]
        : "",
      assignedTo: project.assignedTo,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const statusObj = statuses.find((s) => s.name === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your project portfolio</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setViewMode(viewMode === "kanban" ? "list" : "kanban")
            }
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            {viewMode === "kanban" ? "List View" : "Kanban View"}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
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
                placeholder="Search projects..."
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
            {statuses.map((status) => (
              <option key={status.name} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProject(null);
                setFormData({
                  name: "",
                  description: "",
                  status: "Planning",
                  startDate: "",
                  endDate: "",
                  assignedTo: "",
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
                  Project Name *
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
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status.name} value={status.name}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To
                </label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) =>
                    setFormData({ ...formData, assignedTo: e.target.value })
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
                  setEditingProject(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingProject ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {statuses.map((status) => (
            <div key={status.name} className="bg-white rounded-lg shadow">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {status.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {
                      filteredProjects.filter(
                        (project) => project.status === status.name
                      ).length
                    }
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {filteredProjects
                  .filter((project) => project.status === status.name)
                  .map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          {project.name}
                        </h4>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>{project.assignedTo}</span>
                        <span>{project.tasks.length} tasks</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              project.progress
                            )}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {statuses
                          .filter((s) => s.name !== status.name)
                          .map((nextStatus) => (
                            <button
                              key={nextStatus.name}
                              onClick={() =>
                                handleStatusChange(project.id, nextStatus.name)
                              }
                              className="text-xs px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                            >
                              {nextStatus.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              All Projects ({filteredProjects.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {project.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {project.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              project.progress
                            )}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.startDate && project.endDate ? (
                        <div>
                          <div>
                            {formatDate(project.startDate)} -{" "}
                            {formatDate(project.endDate)}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not set</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
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
      )}
    </div>
  );
}
