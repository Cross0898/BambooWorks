import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Task } from "../types/Task";
import { generateUniqueId } from "../utils/helpers";

interface AddEditTaskFormProps {
  taskToEdit: Task | null;
  onSave: (task: Task) => void;
  open: boolean;
  handleClose: () => void;
}

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({
  taskToEdit,
  onSave,
  open,
  handleClose,
}) => {
  // State variables for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">(
    "Pending"
  );

  // Effect to pre-populate the form fields when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setDueDate(taskToEdit.dueDate);
      setStatus(taskToEdit.status);
    } else {
      // Reset the form when taskToEdit is null (after saving or editing)
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
    }
  }, [taskToEdit]); // Trigger the effect when taskToEdit changes

  // Ensure the form resets when the modal is closed
  const handleCloseForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Pending");
    handleClose(); // Close the modal
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (title.trim()) {
      const updatedTask: Task = {
        id: taskToEdit ? taskToEdit.id : generateUniqueId(), // Use the existing task ID for edit
        title,
        description,
        dueDate,
        status,
      };

      onSave(updatedTask); // Pass the updated task to the onSave function
      handleCloseForm(); // Reset form and close the modal
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <DialogTitle>{taskToEdit ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} width={"35rem"}>
            {/* Title Field */}
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />

            {/* Description Field */}
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />

            {/* Due Date Field */}
            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />

            {/* Status Field */}
            <TextField
              label="Status"
              select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "Pending" | "In Progress" | "Completed"
                )
              }
              fullWidth
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>

            {/* Submit Button */}
            <Button variant="contained" color="primary" type="submit">
              {taskToEdit ? "Save Changes" : "Add Task"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTaskForm;
