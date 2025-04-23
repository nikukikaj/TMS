// components/TaskItem.jsx
import React from "react";
import { Card, Button, Form, Badge } from "react-bootstrap";

const TaskItem = ({ task, users, onEdit, onDelete, onStatusChange }) => {
  const badgeColor =
    task.status === "Done"
      ? "success"
      : task.status === "In Progress"
      ? "warning"
      : "secondary";

  return (
    <Card className="mb-3 shadow-sm border-0 rounded-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Card.Title className="fs-6 mb-1">{task.title}</Card.Title>
            <Card.Text className="mb-0 text-muted">
              Assigned to:{" "}
              <strong>
                {users.find((u) => u.id === task.assignedTo)?.name ||
                  "Unassigned"}
              </strong>
            </Card.Text>
          </div>
          <Badge bg={badgeColor} className="align-self-start">
            {task.status}
          </Badge>
        </div>

        <div className="d-flex flex-wrap gap-2 bg-light p-2 rounded">
          <Form.Select
            size="sm"
            style={{ maxWidth: "180px" }}
            value={task.status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </Form.Select>

          <Button size="sm" variant="outline-warning" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="outline-danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
