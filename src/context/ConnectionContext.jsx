import { createContext, useContext, useEffect, useState } from "react";

const ConnectionContext = createContext();

export const useConnections = () => useContext(ConnectionContext);

export const ConnectionProvider = ({ children }) => {
  const [connectedStudents, setConnectedStudents] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("connectedStudents")) || [];
    setConnectedStudents(saved);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("connectedStudents", JSON.stringify(connectedStudents));
  }, [connectedStudents]);

  const addConnection = (student) => {
    if (!connectedStudents.some((s) => s.id === student.id)) {
      setConnectedStudents((prev) => [...prev, student]);
    }
  };

  return (
    <ConnectionContext.Provider value={{ connectedStudents, addConnection }}>
      {children}
    </ConnectionContext.Provider>
  );
};
