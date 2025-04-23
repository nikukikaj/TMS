// components/AssignDropdown.jsx
import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";

const AssignDropdown = ({ assignedTo, setAssignedTo }) => {
  const { users } = useContext(TaskContext);

  return (
    <Form.Select
      value={assignedTo}
      onChange={(e) => setAssignedTo(Number(e.target.value))}
    >
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default AssignDropdown;
