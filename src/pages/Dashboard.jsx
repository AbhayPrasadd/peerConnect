import React, { useState } from "react";
import { useConnections } from "../context/ConnectionContext";
import { Users, Search, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const { connectedStudents } = useConnections();
  const [activeTab, setActiveTab] = useState("profile");

  const stats = {
    connections: connectedStudents.length,
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
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome to your PeerConnect dashboard!</p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<Users className="w-8 h-8" />} label="Connections" value={stats.connections} color="green" />
        <StatCard icon={<Search className="w-8 h-8" />} label="Skills Matched" value={stats.skillsMatched} color="blue" />
        <StatCard icon={<Tag className="w-8 h-8" />} label="Project Tags" value={stats.projectTags} color="purple" />
      </section>

      {/* Tabs */}
      <nav className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-6 text-base sm:text-lg font-medium">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 transition whitespace-nowrap ${
                activeTab === tab
                  ? "text-green-700 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-green-600"
              }`}
              aria-current={activeTab === tab ? "page" : undefined}
            >
              {tabContent[tab].title}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-2">{tabContent[activeTab].title}</h2>
            <p className="text-gray-700 text-base sm:text-lg">{tabContent[activeTab].description}</p>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    className={`bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 flex items-center space-x-4 border-t-4 border-${color}-500`}
    whileHover={{ scale: 1.03 }}
  >
    <div className={`p-3 bg-${color}-100 rounded-full text-${color}-600`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </motion.div>
);

export default Dashboard;
