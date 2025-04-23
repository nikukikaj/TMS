// components/ProjectView.jsx
import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "./TaskList";
import { Card } from "react-bootstrap";

const ProjectView = ({ projectId }) => {
  const { projects } = useContext(TaskContext);
  const project = projects.find((p) => p.id === projectId);

  if (!project) return <p className="text-danger">Project not found.</p>;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-1">{project.name}</h4>
        <p className="text-muted">
          {project.description || "No description provided."}
        </p>
        <TaskList project={project} />
      </Card.Body>
    </Card>
  );
};

export default ProjectView;
