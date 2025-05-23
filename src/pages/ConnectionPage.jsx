// ConnectionPage.jsx
import React, { useEffect, useState } from "react";
import mockStudents from "../data/mockStudents.json";

const ConnectionPage = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem("connectionRequests")) || [];
    const matched = mockStudents.filter((s) => requests.includes(s.id));
    setConnections(matched);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Connections</h2>
      {connections.length === 0 ? (
        <p className="text-gray-600">No connections yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((student) => (
            <div key={student.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold mb-1">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.year} - {student.department}</p>
              <p className="mt-2 text-sm"><strong>Skills:</strong> {student.skills.join(", ")}</p>
              <p className="text-sm"><strong>Project Areas:</strong> {student.projectAreas.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectionPage;