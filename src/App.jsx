import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//components
import Layout from "./components/Layout";

//pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import MyProfilePage from "./pages/MyProfilePage";
import BrowseStudentsPage from "./pages/BrowseStudentsPage";
import ConnectionPage from "./pages/ConnectionPage";

const App = () => {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={user ? <Layout /> : <Navigate to="/auth" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="my-profile" element={<MyProfilePage />} />
          <Route path="browse-students" element={<BrowseStudentsPage />} />
          <Route path="connectionPage" element={<ConnectionPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

