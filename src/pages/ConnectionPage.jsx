import React from "react";
import { useConnections } from "../context/ConnectionContext";

const ConnectionPage = () => {
  const { connectedStudents } = useConnections();

  if (connectedStudents.length === 0) {
    return <p className="p-4 text-center">You have no connections yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Connections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {connectedStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl p-4 shadow-md">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionPage;
