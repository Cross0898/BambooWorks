import { Task } from "../types/Task";

// Utility function to format a date string to a more readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); 
};

// Helper function to search through tasks by title
export const filterTasksByTitle = (tasks: Task[], search: string) => {
  return tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
};
// Helper function to search through tasks by status
export const filterTasksByStatus = (tasks: Task[], status: string) => {
  if (status === "All") return tasks;
  return tasks.filter(task => task.status === status);
};
  

// Function to generate a unique ID
export const generateUniqueId = () => {
  return `task-${Date.now()}`; // unique ID generation 
};
