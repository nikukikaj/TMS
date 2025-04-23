// components/Sidebar.jsx
import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";
import { FaTachometerAlt, FaColumns, FaFolderOpen } from "react-icons/fa";

const Sidebar = ({ onSelectPage, currentProjectId, onSelectProject }) => {
  const { projects } = useContext(TaskContext);

  return (
    <div
      className="bg-dark text-white d-flex flex-column p-4 shadow"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <div className="mb-5 text-center">
        <h4 className="text-white fw-bold">Task Manager</h4>
      </div>

      <Nav className="flex-column gap-2">
        <Nav.Link
          className="text-white d-flex align-items-center gap-2"
          onClick={() => onSelectPage("dashboard")}
        >
          <FaTachometerAlt /> Dashboard
        </Nav.Link>
        <Nav.Link
          className="text-white d-flex align-items-center gap-2"
          onClick={() => onSelectPage("projects")}
        >
          <FaFolderOpen /> All Projects
        </Nav.Link>
        <Nav.Link
          className="text-white d-flex align-items-center gap-2"
          onClick={() => onSelectPage("kanban")}
        >
          <FaColumns /> Kanban View
        </Nav.Link>
      </Nav>

      <div className="mt-5 border-top pt-3">
        <h6 className="text-uppercase text-muted small mb-3">Your Projects</h6>
        <Nav className="flex-column gap-1">
          {projects.length === 0 ? (
            <div className="text-muted small ms-2">No projects yet.</div>
          ) : (
            projects.map((project) => (
              <Nav.Link
                key={project.id}
                className={`text-white ps-3 rounded ${
                  currentProjectId === project.id
                    ? "bg-secondary fw-semibold"
                    : "text-white"
                }`}
                onClick={() => onSelectProject(project.id)}
              >
                • {project.name}
              </Nav.Link>
            ))
          )}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
