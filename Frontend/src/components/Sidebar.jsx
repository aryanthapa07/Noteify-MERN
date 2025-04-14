import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Noteify</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
