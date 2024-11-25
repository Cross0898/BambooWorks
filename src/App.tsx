import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import MainTaskPage from "./components/MainTaskPage";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainTaskPage />
    </ThemeProvider>
  );
};

export default App;
