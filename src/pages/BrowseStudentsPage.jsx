// BrowseStudentsPage.jsx
import React, { useEffect, useState } from "react";
import mockStudents from "../data/mockStudents.json";

const BrowseStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterSkill, setFilterSkill] = useState("");

  useEffect(() => {
    setStudents(mockStudents);
  }, []);

  const sendConnectionRequest = (id) => {
    const requests = JSON.parse(localStorage.getItem("connectionRequests")) || [];
    if (!requests.includes(id)) {
      requests.push(id);
      localStorage.setItem("connectionRequests", JSON.stringify(requests));
      alert("Connection request sent.");
    } else {
      alert("Request already sent.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.interests.join(" ").toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept ? student.department === filterDept : true;
    const matchSkill = filterSkill
      ? student.skills.includes(filterSkill)
      : true;
    return matchSearch && matchDept && matchSkill;
  });

  const departments = [...new Set(mockStudents.map((s) => s.department))];
  const allSkills = [...new Set(mockStudents.flatMap((s) => s.skills))];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Browse Students</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold mb-1">{student.name}</h3>
            <p className="text-sm text-gray-600">{student.year} - {student.department}</p>
            <p className="mt-2 text-sm"><strong>Skills:</strong> {student.skills.join(", ")}</p>
            <p className="text-sm"><strong>Interests:</strong> {student.interests.join(", ")}</p>
            <button
              onClick={() => sendConnectionRequest(student.id)}
              className="mt-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseStudentsPage;
