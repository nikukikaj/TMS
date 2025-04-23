import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";

const ProjectForm = () => {
  const { setProjects } = useContext(TaskContext);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      name: projectName,
      description,
      tasks: [],
    };
    setProjects((prev) => [...prev, newProject]);
    setProjectName("");
    setDescription("");
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h4>Create New Project</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Add Project</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProjectForm;
