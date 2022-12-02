import { Routes, Route, Navigate } from "react-router-dom";


import Projects from "./components/projects";
import Tasks from "./components/tasks";
import Dashboard from "./components/Dashboard";
import Timer from "./components/timer/Timer";
import Edit from "./components/edit";



const MainRoutes = () => (
  <Routes>

        <Route path="/" element={<Navigate replace to="dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit" element={<Edit />}>
          <Route path="/edit" element={<Navigate replace to="projects" />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        <Route path="/timer" element={<Timer />} />
  </Routes>
);

export default MainRoutes;
