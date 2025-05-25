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
    <div className=" sm:px-6 md:px-10 py-8   font-sans">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome to your PeerConnect dashboard</p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard icon={<Users />} label="Connections" value={stats.connections} color="blue" />
        <StatCard icon={<Search />} label="Skills Matched" value={stats.skillsMatched} color="indigo" />
        <StatCard icon={<Tag />} label="Project Tags" value={stats.projectTags} color="teal" />
      </section>

      {/* Tabs */}
      <nav className="mb-6">
        <div className="flex flex-wrap gap-4 text-base sm:text-lg font-medium">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
              }`}
            >
              {tabContent[tab].title}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <main className="bg-white p-6 md:p-8 rounded-2xl shadow-md border">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">{tabContent[activeTab].title}</h2>
            <p className="text-gray-600">{tabContent[activeTab].description}</p>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      border: "border-indigo-200",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-600",
      border: "border-teal-200",
    },
  };

  const colors = colorMap[color];

  // Example dummy sparkline graph (can be dynamic later)
  const Sparkline = () => (
    <svg width="80" height="30" viewBox="0 0 80 30" fill="none">
      <polyline
        fill="none"
        stroke="#4f46e5"
        strokeWidth="2"
        points="0,20 15,10 30,15 45,5 60,10 75,4"
      />
    </svg>
  );

  return (
    <motion.div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4 bg-white p-5 rounded-xl shadow-sm border-t-4 ${colors.border}`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon and Label */}
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl ${colors.bg} ${colors.text} shadow-sm`}>
          {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>

      {/* Mini Graph */}
      <div className="w-full sm:w-auto pt-2 sm:pt-0">
        <Sparkline />
      </div>
    </motion.div>
  );
};


export default Dashboard;
