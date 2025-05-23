import React, { useState } from "react";
import { Users, User, Search, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const stats = {
    connections: 12,
    skillsMatched: 18,
    projectTags: 5,
  };

  const tabContent = {
    profile: {
      title: "My Profile",
      description: "View and edit your personal details, bio, and skills.",
    },
    browse: {
      title: "Browse Students",
      description: "Search and explore students based on skills and interests.",
    },
    connections: {
      title: "My Connections",
      description: "Manage your network and see mutual interests.",
    },
  };

  return (
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-green-800 mb-1">Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome to your PeerConnect dashboard!</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<Users className="w-8 h-8 text-green-600" />} label="Connections" value={stats.connections} />
        <StatCard icon={<Search className="w-8 h-8 text-blue-600" />} label="Skills Matched" value={stats.skillsMatched} />
        <StatCard icon={<Tag className="w-8 h-8 text-purple-600" />} label="Project Tags" value={stats.projectTags} />
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-6 text-lg font-medium">
          {["profile", "browse", "connections"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 transition ${
                activeTab === tab
                  ? "text-green-700 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              {tabContent[tab].title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-3">{tabContent[activeTab].title}</h2>
            <p className="text-gray-700 text-lg">{tabContent[activeTab].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 flex items-center space-x-4"
    whileHover={{ scale: 1.03 }}
  >
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </motion.div>
);

export default Dashboard;
