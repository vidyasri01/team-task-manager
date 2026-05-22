import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// IMPORT PAGES

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import Tasks from "./Pages/Tasks";
import Team from "./Pages/Team";

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