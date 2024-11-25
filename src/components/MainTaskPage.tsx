import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { addTask, loadMockData } from "../redux/slices/taskSlice";
import { Task } from "../types/Task";

import FilterBar from "./FilterBar";
import TaskList from "./TaskList";
import AddEditTaskForm from "./AddEditTaskForm";

const MainTaskPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMockData()); // Load mock data on first render
  }, [dispatch]);

  const [search, setSearch] = useState(""); // State for search bar
  const [status, setStatus] = useState("All"); // State for status filter
  const [open, setOpen] = useState(false); // State for controlling modal visibility
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleSave = (updatedTask: Task) => {
    dispatch(addTask(updatedTask));
    setSelectedTask(null); // Clear selected task
    setOpen(false); // Close the modal after saving
  };

  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => {
    setSelectedTask(null);
    setOpen(false);
  }; // Close the modal

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 600, color: "#333", marginBottom: 3 }}
      >
        TASK SCHEDULER
      </Typography>

      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* Button to open Add Task Modal */}
      <Box mt={2} sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ textTransform: "none", fontWeight: "500", boxShadow: 2 }}
          onClick={handleOpen}
        >
          ADD NEW TASK
        </Button>
      </Box>

      {/* Task List */}
      <TaskList search={search} status={status} />

      {/* Add/Edit Task Modal */}
      <AddEditTaskForm
        taskToEdit={selectedTask}
        onSave={handleSave}
        open={open}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default MainTaskPage;
