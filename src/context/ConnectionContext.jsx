// ConnectionContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [connectedStudents, setConnectedStudents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("connectedStudents");
    if (saved) setConnectedStudents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("connectedStudents", JSON.stringify(connectedStudents));
  }, [connectedStudents]);

  const addConnection = (student) => {
    if (!connectedStudents.some((s) => s.id === student.id)) {
      setConnectedStudents((prev) => [...prev, student]);
      alert("Connection request sent."); // Simple alert notification
    }
  };

  return (
    <ConnectionContext.Provider value={{ connectedStudents, addConnection }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnections = () => useContext(ConnectionContext);
