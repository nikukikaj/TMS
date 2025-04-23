// components/ProjectCard.jsx
import React from "react";
import { Card, Button, Badge, Stack } from "react-bootstrap";

const ProjectCard = ({
  project,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  children,
}) => {
  return (
    <Card className="h-100 shadow-sm border rounded-4 p-2 bg-light">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">{project.name}</h5>
            <Badge pill bg="info">
              {project.tasks.length}{" "}
              {project.tasks.length === 1 ? "Task" : "Tasks"}
            </Badge>
          </div>

          <Card.Text className="text-muted" style={{ minHeight: "60px" }}>
            {project.description || <em>No description provided.</em>}
          </Card.Text>
        </div>

        <Stack direction="horizontal" gap={2} className="mt-3">
          <Button
            variant="outline-primary"
            size="sm"
            className="w-100"
            onClick={onSelect}
          >
            {isSelected ? "Hide Tasks" : "View Tasks"}
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            className="w-100"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="w-100"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Stack>

        {children && <div className="pt-3">{children}</div>}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
