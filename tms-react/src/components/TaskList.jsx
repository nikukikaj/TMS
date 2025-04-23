// components/TaskList.jsx
import React, { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";
import AssignDropdown from "./AssignDropdown";
import TaskItem from "./TaskItem";

const TaskList = ({ project }) => {
  const { setProjects, users } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");
  const [assignedTo, setAssignedTo] = useState(users[0]?.id || "");
  const [editTask, setEditTask] = useState(null);

  const updateProjectTasks = (newTasks) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, tasks: newTasks } : p))
    );
  };

  const handleAddTask = () => {
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      assignedTo,
      status: "To Do",
    };
    updateProjectTasks([...project.tasks, newTaskObj]);
    setNewTask("");
    setAssignedTo(users[0]?.id || "");
  };

  const handleDeleteTask = (taskId) => {
    updateProjectTasks(project.tasks.filter((t) => t.id !== taskId));
  };

  const handleSaveTaskEdit = () => {
    const updated = project.tasks.map((t) =>
      t.id === editTask.id ? editTask : t
    );
    updateProjectTasks(updated);
    setEditTask(null);
  };

  return (
    <div className="mt-3">
      <h5 className="mb-3">Tasks</h5>
      <div className="mb-3">
        {project.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            users={users}
            onEdit={() => setEditTask({ ...task })}
            onDelete={() => handleDeleteTask(task.id)}
            onStatusChange={(status) => {
              const updated = project.tasks.map((t) =>
                t.id === task.id ? { ...t, status } : t
              );
              updateProjectTasks(updated);
            }}
          />
        ))}
      </div>

      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <AssignDropdown
            assignedTo={assignedTo}
            setAssignedTo={setAssignedTo}
          />
        </Form.Group>
        <Button onClick={handleAddTask} disabled={!newTask}>
          Add Task
        </Button>
      </Form>

      <Modal show={!!editTask} onHide={() => setEditTask(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                value={editTask?.title || ""}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Assign To</Form.Label>
              <Form.Select
                value={editTask?.assignedTo || ""}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    assignedTo: Number(e.target.value),
                  })
                }
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditTask(null)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveTaskEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
