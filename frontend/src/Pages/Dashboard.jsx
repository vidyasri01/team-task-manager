import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {

  const navigate = useNavigate();

  const API =
    "https://team-task-manager-production-813d.up.railway.app";

  const role =
    localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
      status: "Pending",
      dueDate: "",
      project: "",
      assignedTo: "",
    });

  // FETCH ALL

  useEffect(() => {

    fetchTasks();
    fetchProjects();
    fetchUsers();

  }, []);

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        `${API}/api/tasks`
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH PROJECTS

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        `${API}/api/projects`
      );

      setProjects(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH USERS

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        `${API}/api/auth/users`
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // HANDLE CHANGE

  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE TASK

  const createTask = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      await axios.post(
        `${API}/api/tasks/create`,
        {
          ...taskData,
          createdBy: user._id,
        }
      );

      alert("Task Created Successfully");

      fetchTasks();

      setTaskData({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
        project: "",
        assignedTo: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error creating task");
    }
  };

  // MARK COMPLETED

  const markCompleted = async (id) => {

    try {

      await axios.put(
        `${API}/api/tasks/${id}`,
        {
          status: "Completed",
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE TASK

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `${API}/api/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // LOGOUT

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  // COUNTS

  const totalTasks = tasks.length;

  const pendingTasks =
    tasks.filter(
      (task) => task.status === "Pending"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) => task.status === "Completed"
    ).length;

  const overdueTasks =
    tasks.filter(
      (task) =>
        task.status !== "Completed" &&
        task.dueDate &&
        new Date(task.dueDate) <
        new Date()
    ).length;

  return (

    <div style={styles.container}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>
          Team Task
        </h2>

        <div style={styles.activeMenu}>
          <FaHome />
          <span style={{ marginLeft: "12px" }}>
            Dashboard
          </span>
        </div>

        <div
          style={styles.menuItem}
          onClick={() => navigate("/projects")}
        >
          <FaProjectDiagram />
          <span style={{ marginLeft: "12px" }}>
            Projects
          </span>
        </div>

        <div
          style={styles.menuItem}
          onClick={() => navigate("/tasks")}
        >
          <FaTasks />
          <span style={{ marginLeft: "12px" }}>
            Tasks
          </span>
        </div>

        <div
          style={styles.menuItem}
          onClick={() => navigate("/team")}
        >
          <FaUsers />
          <span style={{ marginLeft: "12px" }}>
            Team
          </span>
        </div>

        <div
          style={styles.logoutSidebar}
          onClick={logout}
        >
          <FaSignOutAlt />
          <span style={{ marginLeft: "12px" }}>
            Logout
          </span>
        </div>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        <div style={styles.topbar}>

          <h1 style={styles.heading}>
            Dashboard
          </h1>

          <div style={styles.roleBadge}>
            {role}
          </div>

        </div>

        {/* STATS */}

        <div style={styles.statsContainer}>

          <div style={styles.card}>
            <h2>Total Tasks</h2>
            <p style={styles.number}>
              {totalTasks}
            </p>
          </div>

          <div style={styles.card}>
            <h2>Pending</h2>
            <p
              style={{
                ...styles.number,
                color: "#f59e0b",
              }}
            >
              {pendingTasks}
            </p>
          </div>

          <div style={styles.card}>
            <h2>Completed</h2>
            <p
              style={{
                ...styles.number,
                color: "#10b981",
              }}
            >
              {completedTasks}
            </p>
          </div>

          <div style={styles.card}>
            <h2>Overdue</h2>
            <p
              style={{
                ...styles.number,
                color: "#ef4444",
              }}
            >
              {overdueTasks}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "250px",
    background: "#111827",
    color: "white",
    padding: "30px 20px",
  },

  logo: {
    marginBottom: "40px",
    fontSize: "32px",
    fontWeight: "bold",
  },

  menuItem: {
    padding: "16px",
    marginBottom: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#1f2937",
    display: "flex",
    alignItems: "center",
  },

  activeMenu: {
    padding: "16px",
    marginBottom: "15px",
    borderRadius: "10px",
    background: "#2563eb",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },

  logoutSidebar: {
    marginTop: "40px",
    padding: "16px",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#ef4444",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: "38px",
    color: "#111827",
  },

  roleBadge: {
    background: "#2563eb",
    color: "white",
    padding: "10px 18px",
    borderRadius: "30px",
    fontWeight: "bold",
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    width: "220px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  number: {
    fontSize: "35px",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default Dashboard;