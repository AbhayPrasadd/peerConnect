import React, { useEffect, useState } from "react";
import mockStudents from "../data/mockStudents.json";
import { useConnections } from "../context/ConnectionContext";
import { UserPlus } from "lucide-react"; // Only using connect icon

const BrowseStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { connectedStudents, addConnection } = useConnections();

  useEffect(() => {
    setStudents(mockStudents);
  }, []);

  const sendConnectionRequest = (student) => {
    if (!connectedStudents.some((s) => s.id === student.id)) {
      addConnection(student);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.interests.join(" ").toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept ? student.department === filterDept : true;
    const matchSkill = filterSkill ? student.skills.includes(filterSkill) : true;
    return matchSearch && matchDept && matchSkill;
  });

  const departments = [...new Set(mockStudents.map((s) => s.department))];
  const allSkills = [...new Set(mockStudents.flatMap((s) => s.skills))];

  return (
    <div className="p-4 sm:px-6 md:px-10 py-8 relative">
      {showToast && <Toast message="✅ Connection Request Sent!" />}

      <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">Browse Students</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or interest"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          value={filterSkill}
          onChange={(e) => setFilterSkill(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">All Skills</option>
          {allSkills.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStudents.map((student) => {
          const isConnected = connectedStudents.some((s) => s.id === student.id);

          return (
            <div
              key={student.id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition border border-gray-100"
            >
              {/* Profile with name initials */}
              <div className="flex justify-center mb-3">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <h3 className="text-center text-lg font-semibold text-blue-800">{student.name}</h3>
              <p className="text-center text-sm text-gray-500">
                {student.year} • {student.department}
              </p>
              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Skills:</strong> {student.skills.join(", ")}
                </p>
                <p>
                  <strong>Interests:</strong> {student.interests.join(", ")}
                </p>
              </div>
              <button
                onClick={() => sendConnectionRequest(student)}
                className={`mt-4 w-full px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition ${
                  isConnected
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isConnected}
              >
                <UserPlus className="w-5 h-5" />
                {isConnected ? "Connected" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ✅ Top-right Toast
const Toast = ({ message }) => (
  <div className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
    {message}
  </div>
);

export default BrowseStudentsPage;
