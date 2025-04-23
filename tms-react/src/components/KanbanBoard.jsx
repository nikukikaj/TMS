// components/KanbanBoard.jsx
import React, { useContext } from "react";
import { Card, Col, Row, Badge, Form } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";

const KanbanBoard = () => {
  const { projects, setProjects, users } = useContext(TaskContext);

  const allTasks = projects.flatMap((project) =>
    project.tasks.map((task) => ({
      ...task,
      projectId: project.id,
      projectName: project.name,
    }))
  );

  const groupedTasks = {
    "To Do": allTasks.filter((task) => task.status === "To Do"),
    "In Progress": allTasks.filter((task) => task.status === "In Progress"),
    Done: allTasks.filter((task) => task.status === "Done"),
  };

  const handleStatusChange = (taskId, newStatus, projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id !== projectId) return project;
        return {
          ...project,
          tasks: project.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        };
      })
    );
  };

  return (
    <>
      <h2 className="mb-4">Kanban View</h2>
      <Row>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <Col key={status}>
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-light text-center">
                <strong>{status}</strong>{" "}
                <Badge
                  bg={
                    status === "To Do"
                      ? "secondary"
                      : status === "In Progress"
                      ? "warning"
                      : "success"
                  }
                >
                  {tasks.length}
                </Badge>
              </Card.Header>
              <Card.Body style={{ minHeight: "300px" }}>
                {tasks.length === 0 ? (
                  <p className="text-muted text-center">No tasks</p>
                ) : (
                  tasks.map((task) => (
                    <Card key={task.id} className="mb-3 shadow-sm">
                      <Card.Body>
                        <Card.Title className="fs-6">{task.title}</Card.Title>
                        <Card.Text className="mb-1 text-muted">
                          Project: {task.projectName}
                        </Card.Text>
                        <Card.Text className="mb-2">
                          Assigned to:{" "}
                          <strong>
                            {users.find((u) => u.id === task.assignedTo)?.name}
                          </strong>
                        </Card.Text>
                        <Form.Select
                          size="sm"
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(
                              task.id,
                              e.target.value,
                              task.projectId
                            )
                          }
                        >
                          <option>To Do</option>
                          <option>In Progress</option>
                          <option>Done</option>
                        </Form.Select>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default KanbanBoard;
