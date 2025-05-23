import React, { useEffect, useState } from "react";
import mockStudents from "../data/mockStudents.json";
import { useConnections } from "../context/ConnectionContext";  // import context hook

const BrowseStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterSkill, setFilterSkill] = useState("");

  const { connectedStudents, addConnection } = useConnections();  // get global state & updater

  useEffect(() => {
    setStudents(mockStudents);
  }, []);

  const sendConnectionRequest = (student) => {
    if (!connectedStudents.some((s) => s.id === student.id)) {
      addConnection(student);  // add full student object to global context
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
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Browse Students</h2>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or interest"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
        />
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/4"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          value={filterSkill}
          onChange={(e) => setFilterSkill(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/4"
        >
          <option value="">All Skills</option>
          {allSkills.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStudents.map((student) => {
          const isConnected = connectedStudents.some(s => s.id === student.id);

          return (
            <div key={student.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="text-center text-lg font-semibold">{student.name}</h3>
              <p className="text-center text-sm text-gray-500">{student.year} - {student.department}</p>
              <div className="mt-2 text-sm text-gray-700">
                <p><strong>Skills:</strong> {student.skills.join(", ")}</p>
                <p><strong>Interests:</strong> {student.interests.join(", ")}</p>
              </div>
              <button
                onClick={() => sendConnectionRequest(student)}
                className={`mt-4 w-full px-4 py-2 rounded-md text-white font-medium ${
                  isConnected
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={isConnected}
              >
                {isConnected ? "Connected" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseStudentsPage;
