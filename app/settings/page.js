"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
} from "lucide-react";

const settingsTabs = [
  { id: "profile", name: "Profile", icon: User },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "security", name: "Security", icon: Shield },
  { id: "appearance", name: "Appearance", icon: Palette },
  { id: "integrations", name: "Integrations", icon: Database },
  { id: "preferences", name: "Preferences", icon: Settings },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1-555-0123",
    role: "Sales Manager",
    department: "Sales",
    timezone: "America/New_York",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    dealUpdates: true,
    leadAlerts: true,
    taskReminders: true,
    weeklyReports: false,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    sidebarCollapsed: false,
    compactMode: false,
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    console.log("Profile updated:", profileData);
  };

  const handleNotificationChange = (key) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAppearanceChange = (key, value) => {
    setAppearanceSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Information
                </h3>
                <p className="text-sm text-gray-600">
                  Update your personal information
                </p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
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
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) =>
                        setProfileData({ ...profileData, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          department: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          timezone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Notification Preferences
                </h3>
                <p className="text-sm text-gray-600">
                  Choose how you want to be notified
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive notifications via email
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleNotificationChange("emailNotifications")
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      notificationSettings.emailNotifications
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        notificationSettings.emailNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Push Notifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive push notifications in browser
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleNotificationChange("pushNotifications")
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      notificationSettings.pushNotifications
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        notificationSettings.pushNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Deal Updates
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get notified about deal changes
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("dealUpdates")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      notificationSettings.dealUpdates
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        notificationSettings.dealUpdates
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Lead Alerts
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get notified about new leads
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("leadAlerts")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      notificationSettings.leadAlerts
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        notificationSettings.leadAlerts
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Task Reminders
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get reminded about upcoming tasks
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("taskReminders")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      notificationSettings.taskReminders
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        notificationSettings.taskReminders
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Weekly Reports
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive weekly performance reports
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange("weeklyReports")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      notificationSettings.weeklyReports
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        notificationSettings.weeklyReports
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Security Settings
                </h3>
                <p className="text-sm text-gray-600">
                  Manage your account security
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Change Password
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Enable 2FA
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Active Sessions
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Manage your active login sessions
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-gray-500">
                          Chrome on Windows • Last active: 2 minutes ago
                        </p>
                      </div>
                      <span className="text-xs text-green-600">Current</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Appearance
                </h3>
                <p className="text-sm text-gray-600">
                  Customize the look and feel of your CRM
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={appearanceSettings.theme}
                    onChange={(e) =>
                      handleAppearanceChange("theme", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Compact Mode
                    </h4>
                    <p className="text-sm text-gray-600">
                      Use a more compact layout
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleAppearanceChange(
                        "compactMode",
                        !appearanceSettings.compactMode
                      )
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      appearanceSettings.compactMode
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        appearanceSettings.compactMode
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Collapsed Sidebar
                    </h4>
                    <p className="text-sm text-gray-600">
                      Start with sidebar collapsed
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleAppearanceChange(
                        "sidebarCollapsed",
                        !appearanceSettings.sidebarCollapsed
                      )
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      appearanceSettings.sidebarCollapsed
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        appearanceSettings.sidebarCollapsed
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Settings */}
          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Integrations
                </h3>
                <p className="text-sm text-gray-600">
                  Connect with your favorite tools
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Email Integration
                      </h4>
                      <p className="text-sm text-gray-600">
                        Connect your email account
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Calendar Integration
                      </h4>
                      <p className="text-sm text-gray-600">
                        Sync with Google Calendar
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Connect
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Slack Integration
                      </h4>
                      <p className="text-sm text-gray-600">
                        Get notifications in Slack
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Settings */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Preferences
                </h3>
                <p className="text-sm text-gray-600">
                  Customize your CRM experience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Dashboard
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="overview">Overview</option>
                    <option value="sales">Sales Dashboard</option>
                    <option value="leads">Leads Dashboard</option>
                    <option value="custom">Custom Dashboard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD (C$)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Auto-save Forms
                    </h4>
                    <p className="text-sm text-gray-600">
                      Automatically save form data
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
