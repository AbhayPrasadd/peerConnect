import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Users,
  Network,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "My Profile", path: "/dashboard/my-profile", icon: <User size={20} /> },
    { name: "Browse Students", path: "/dashboard/browse-students", icon: <Users size={20} /> },
    { name: "Connections", path: "/dashboard/connectionPage", icon: <Network size={20} /> },
  ];

  return (
    <div
      className={`bg-green-900 text-white h-screen p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <ul className="space-y-4 mt-16">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                location.pathname === item.path ? "bg-green-700" : "hover:bg-green-800"
              }`}
            >
              {item.icon}
              <span
                className={`${
                  isSidebarOpen ? "block" : "hidden"
                } transition-all duration-300`}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
