import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Task } from "../types/Task";
import {
  formatDate,
  filterTasksByTitle,
  filterTasksByStatus,
} from "../utils/helpers";
import { editTask, deleteTask } from "../redux/slices/taskSlice";

import AddEditTaskForm from "./AddEditTaskForm";

interface TaskListProps {
  search: string;
  status: string;
}

const TaskList: React.FC<TaskListProps> = ({ search, status }) => {
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const dispatch = useDispatch();
  const theme = useTheme();

  const filteredTasks = filterTasksByTitle(tasks, search);
  const filteredAndStatusTasks = filterTasksByStatus(filteredTasks, status);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Function to check if a task is overdue
  const isOverdue = (dueDate: string, status: string): boolean => {
    const currentDate = new Date();
    const due = new Date(dueDate);
    // Check if the task is overdue and not completed
    return due < currentDate && status !== "Completed";
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleSave = (updatedTask: Task) => {
    dispatch(editTask(updatedTask)); // Dispatch the edit action with updated task
    setOpenModal(false);
    setSelectedTask(null); // Clear selected task after saving
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedTask(null);
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.success.main }}>
            <TableRow>
              <TableCell sx={{ color: theme.palette.text.primary }}>
                Title
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>
                Due Date
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>
                Status
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndStatusTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="h6" color="textSecondary">
                    No tasks available at the moment.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndStatusTasks.map((task) => (
                <TableRow
                  key={task.id}
                  sx={{
                    "&:hover": { backgroundColor: theme.palette.success.main },
                    backgroundColor: isOverdue(task.dueDate, task.status)
                      ? theme.palette.error.light
                      : "transparent",
                  }}
                >
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{formatDate(task.dueDate)}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(task)}
                      sx={{ color: theme.palette.background.default }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(task.id)}
                      sx={{ color: theme.palette.background.default }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEditTaskForm
        taskToEdit={selectedTask || null}
        onSave={handleSave}
        open={openModal}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default TaskList;
