import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/Task';

// Define your initial state
interface TaskState {
  items: Task[];
}

const mockData: Task[] = [
    {
        "id": "1",
        "title": "Finish React Project",
        "description": "Complete the final tasks for the React project before the deadline.",
        "dueDate": "2024-11-30",
        "status": "In Progress"
      },
      {
        "id": "2",
        "title": "Write Unit Tests",
        "description": "Write unit tests for the application to ensure everything works correctly.",
        "dueDate": "2024-12-05",
        "status": "Pending"
      },
      {
        "id": "3",
        "title": "Design the UI",
        "description": "Create the user interface for the project according to the design specifications.",
        "dueDate": "2024-11-28",
        "status": "Completed"
      },
      {
        "id": "4",
        "title": "Backend API Integration",
        "description": "Integrate the backend APIs with the frontend application to ensure proper functionality.",
        "dueDate": "2024-12-01",
        "status": "In Progress"
      },
      {
        "id": "5",
        "title": "Update Documentation",
        "description": "Update the project documentation to reflect the latest changes.",
        "dueDate": "2024-12-10",
        "status": "Pending"
      }
];

const initialState: TaskState = {
  items: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Existing actions
    addTask(state, action: PayloadAction<Task>) {
      const newTask = { ...action.payload, id: Date.now().toString() }; // Generate a unique ID
      state.items.push(newTask);
    },
    editTask(state, action: PayloadAction<Task>) {
      const { id, title, description, dueDate, status } = action.payload;
      const taskIndex = state.items.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.items[taskIndex] = { id, title, description, dueDate, status };
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },

    // New action to load the mock data
    loadMockData(state) {
      state.items = mockData;
    },
  },
});

export const { addTask, editTask, deleteTask, loadMockData } = taskSlice.actions;
export default taskSlice.reducer;
