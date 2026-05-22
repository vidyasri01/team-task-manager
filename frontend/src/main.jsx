import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// IMPORT PAGES

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* PROJECTS */}

        <Route
          path="/projects"
          element={<Projects />}
        />

        {/* TASKS */}

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        {/* TEAM */}

        <Route
          path="/team"
          element={<Team />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);