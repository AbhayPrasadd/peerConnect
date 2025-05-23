import React, { useState } from "react";
import { Users, User, Search, Tag } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Dummy stats
  const stats = {
    connections: 12,
    skillsMatched: 18,
    projectTags: 5,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">My Profile</h2>
            <p className="text-gray-700">View and edit your personal details, bio, and skills.</p>
          </div>
        );
      case "browse":
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Browse Students</h2>
            <p className="text-gray-700">Search and explore students based on skills and interests.</p>
          </div>
        );
      case "connections":
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">My Connections</h2>
            <p className="text-gray-700">Manage your network and see mutual interests.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your PeerConnect dashboard!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Users className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Connections</p>
            <p className="text-xl font-semibold">{stats.connections}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Search className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Skills Matched</p>
            <p className="text-xl font-semibold">{stats.skillsMatched}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Tag className="text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Project Tags</p>
            <p className="text-xl font-semibold">{stats.projectTags}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-2 font-medium ${
              activeTab === "profile" ? "border-b-2 border-green-600 text-green-700" : "text-gray-600"
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab("browse")}
            className={`pb-2 font-medium ${
              activeTab === "browse" ? "border-b-2 border-green-600 text-green-700" : "text-gray-600"
            }`}
          >
            Browse Students
          </button>
          <button
            onClick={() => setActiveTab("connections")}
            className={`pb-2 font-medium ${
              activeTab === "connections" ? "border-b-2 border-green-600 text-green-700" : "text-gray-600"
            }`}
          >
            My Connections
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;