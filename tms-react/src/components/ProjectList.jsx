// components/ProjectList.jsx
import React, { useContext, useState } from "react";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import TaskList from "./TaskList";

const ProjectList = () => {
  const { projects, setProjects } = useContext(TaskContext);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [editProject, setEditProject] = useState(null);

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    if (selectedProjectId === id) setSelectedProjectId(null);
  };

  const handleSaveEdit = () => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === editProject.id ? editProject : project
      )
    );
    setEditProject(null);
  };

  return (
    <Container>
      <ProjectForm />

      <h3 className="mb-4">Projects Overview</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {projects.map((project) => (
          <Col key={project.id}>
            <ProjectCard
              project={project}
              isSelected={selectedProjectId === project.id}
              onSelect={() =>
                setSelectedProjectId(
                  selectedProjectId === project.id ? null : project.id
                )
              }
              onEdit={() => setEditProject({ ...project })}
              onDelete={() => handleDeleteProject(project.id)}
            >
              {selectedProjectId === project.id && (
                <div className="pt-3">
                  <TaskList project={project} />
                </div>
              )}
            </ProjectCard>
          </Col>
        ))}
      </Row>

      <Modal show={!!editProject} onHide={() => setEditProject(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={editProject?.name || ""}
                onChange={(e) =>
                  setEditProject({ ...editProject, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editProject?.description || ""}
                onChange={(e) =>
                  setEditProject({
                    ...editProject,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditProject(null)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProjectList;
