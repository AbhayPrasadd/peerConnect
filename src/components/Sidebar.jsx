import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Users, Network, X } from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, setIsSidebarOpen]);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "My Profile", path: "/dashboard/my-profile", icon: <User size={20} /> },
    { name: "Browse Students", path: "/dashboard/browse-students", icon: <Users size={20} /> },
    { name: "Connections", path: "/dashboard/connectionPage", icon: <Network size={20} /> },
  ];

  const handleMenuClick = (path) => {
    // Add delay before closing sidebar to let navigation finish
    setTimeout(() => {
      setIsSidebarOpen(false);
    }, 200);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-indigo-900 text-white h-screen w-64 p-4">
        <ul className="space-y-4 mt-16">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  location.pathname === item.path ? "bg-indigo-700" : "hover:bg-indigo-600"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar Drawer with slide-in animation */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 bg-indigo-900 text-white h-full p-4 relative shadow-xl">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X />
          </button>
          <ul className="space-y-4 mt-16">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    location.pathname === item.path
                      ? "bg-indigo-900"
                      : "hover:bg-indigo-600"
                  }`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Transparent Overlay */}
        <div
          className="flex-1 bg-black bg-opacity-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  );
};

export default Sidebar;
