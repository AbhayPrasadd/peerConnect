import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell } from "lucide-react";

// Custom Popover Component
const Popover = ({ children, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative text-white p-2">
        {children}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
          {content}
        </div>
      )}
    </div>
  );
};

// Custom Dropdown Menu Component
const DropdownMenu = ({ children, menuItems }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center space-x-2">
        {children}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-50">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                if (item === "Logout") navigate("/");
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Avatar Component
const Avatar = ({ src, fallback }) => (
  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
    {src ? (
      <img src={src} alt="User" className="w-full h-full object-cover" />
    ) : (
      <span>{fallback}</span>
    )}
  </div>
);

// Navbar Component
const Navbar = ({ setIsSidebarOpen }) => {
  const [notifications] = useState([
    "John Doe sent you a connection request",
    "New message from Sarah",
    "3 new students joined your course",
    "Your profile has 5 new views",
  ]);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-green-900 shadow-md flex items-center justify-between px-6 z-50">
      {/* Sidebar Toggle */}
      <button className="text-white p-2 z-50" onClick={() => setIsSidebarOpen((prev) => !prev)}>
        <Menu className="h-6 w-6" />
      </button>

      {/* Dashboard Title */}
      <div className="text-xl font-semibold text-white">Student Connect</div>

      {/* Notifications and Profile */}
      <div className="flex items-center gap-14">
        {/* Notifications Popover */}
        <Popover
          content={
            <div>
              <div className="text-lg font-semibold text-gray-700">Notifications</div>
              <ul className="mt-2 space-y-2">
                {notifications.length > 0 ? (
                  notifications.map((note, index) => (
                    <li key={index} className="text-gray-600 text-sm border-b py-1">
                      {note}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-sm">No notifications</li>
                )}
              </ul>
            </div>
          }
        >
          <Bell className="h-8 w-8" />
        </Popover>

        {/* Profile Dropdown */}
        <DropdownMenu menuItems={["Profile", "Settings", "Logout"]}>
          <Avatar src="/dashboard/profile.png" fallback="U" />
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
