// components/Dashboard.jsx
import React, { useContext } from "react";
import { Card, Row, Col, Container, ListGroup, Badge } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";

const Dashboard = () => {
  const { projects } = useContext(TaskContext);

  const totalProjects = projects.length;
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.length, 0);
  const tasks = projects.flatMap((p) => p.tasks);

  const countByStatus = (status) =>
    tasks.filter((task) => task.status === status).length;

  return (
    <Container>
      <h2 className="mb-4">Dashboard</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Projects</Card.Title>
              <h3>{totalProjects}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Tasks</Card.Title>
              <h3>{totalTasks}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Task Status</Card.Title>
              <p>
                <Badge bg="secondary">To Do: {countByStatus("To Do")}</Badge>
              </p>
              <p>
                <Badge bg="warning">
                  In Progress: {countByStatus("In Progress")}
                </Badge>
              </p>
              <p>
                <Badge bg="success">Done: {countByStatus("Done")}</Badge>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Header>Projects Overview</Card.Header>
        <ListGroup variant="flush">
          {projects.map((p) => (
            <ListGroup.Item key={p.id}>
              <strong>{p.name}</strong> — {p.tasks.length} task(s)
            </ListGroup.Item>
          ))}
          {projects.length === 0 && (
            <ListGroup.Item>No projects yet.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Dashboard;
