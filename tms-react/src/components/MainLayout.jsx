// components/MainLayout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import ProjectList from "./ProjectList";
import ProjectView from "./ProjectView";
import KanbanBoard from "./KanbanBoard";

const MainLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const renderContent = () => {
    if (selectedProjectId) return <ProjectView projectId={selectedProjectId} />;
    if (activePage === "projects") return <ProjectList />;
    if (activePage === "kanban") return <KanbanBoard />;
    return <Dashboard />;
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar
        onSelectPage={(page) => {
          setActivePage(page);
          setSelectedProjectId(null);
        }}
        currentProjectId={selectedProjectId}
        onSelectProject={(id) => {
          setSelectedProjectId(id);
          setActivePage("");
        }}
      />
      <div className="flex-grow-1 p-4 bg-light">{renderContent()}</div>
    </div>
  );
};

export default MainLayout;
