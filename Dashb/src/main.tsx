import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from "react-router-dom";
import { TimeTrackerProvider } from "./components/context/TimeTrackerContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <BrowserRouter>
      <TimeTrackerProvider>
        <App />
      </TimeTrackerProvider>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
