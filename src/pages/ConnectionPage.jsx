import React, { useState } from "react";
import { useConnections } from "../context/ConnectionContext";
import { Mail, Trash2 } from "lucide-react";

const ConnectionPage = () => {
  const { connectedStudents, removeConnection } = useConnections();
  const [messageOpenId, setMessageOpenId] = useState(null);
  const [messageText, setMessageText] = useState("");

  if (connectedStudents.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500 text-lg">
        You have no connections yet.
      </div>
    );
  }

  const handleSendMessage = (studentId) => {
    alert(`Message sent to student id ${studentId}: ${messageText}`);
    setMessageText("");
    setMessageOpenId(null);
  };

  return (
    <div className="p-6 sm:px-10 md:px-16 py-10 min-h-screen">
      <h2 className="text-4xl font-bold text-blue-800 mb-10 text-center">
        Your Connections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {connectedStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <h3 className="text-center text-lg font-semibold text-blue-800">
              {student.name}
            </h3>
            <p className="text-center text-sm text-gray-500 mb-2">
              {student.year} • {student.department}
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Skills:</strong> {student.skills.join(", ")}
              </p>
              <p>
                <strong>Interests:</strong> {student.interests.join(", ")}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2 relative">
              <button
                onClick={() =>
                  setMessageOpenId(messageOpenId === student.id ? null : student.id)
                }
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
              >
                <Mail className="w-5 h-5" />
                Send Message
              </button>

              {/* Message Modal */}
              {messageOpenId === student.id && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-300 rounded-md shadow-lg p-3 z-50"
                  style={{ minWidth: "250px" }}
                >
                  <textarea
                    rows={3}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Message to ${student.name}`}
                    className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-blue-600"
                  />
                  <div className="flex justify-end mt-2 gap-2">
                    <button
                      onClick={() => setMessageOpenId(null)}
                      className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendMessage(student.id)}
                      disabled={messageText.trim() === ""}
                      className={`px-3 py-1 rounded text-white ${
                        messageText.trim() === ""
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } transition`}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => removeConnection(student.id)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
              >
                <Trash2 className="w-5 h-5" />
                Remove Connection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionPage;
