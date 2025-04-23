import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [users] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  return (
    <TaskContext.Provider value={{ projects, setProjects, users }}>
      {children}
    </TaskContext.Provider>
  );
};
