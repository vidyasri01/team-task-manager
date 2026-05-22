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

  // ROLE

  const role =
    localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);

  // PROJECTS + USERS

  const [projects, setProjects] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  // TASK FORM

  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
      status: "Pending",
      dueDate: "",
      project: "",
      assignedTo: "",
    });

  // FETCH ALL DATA

  useEffect(() => {

    fetchTasks();
    fetchProjects();
    fetchUsers();

  }, []);

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks"
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
        "http://localhost:5000/api/projects"
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
        "http://localhost:5000/api/auth/users"
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE

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
        "http://localhost:5000/api/tasks/create",
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
        `http://localhost:5000/api/tasks/${id}`,
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
        `http://localhost:5000/api/tasks/${id}`
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

  // TASK COUNTS

  const totalTasks = tasks.length;

  const pendingTasks =
    tasks.filter(
      (task) => task.status === "Pending"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) => task.status === "Completed"
    ).length;

  // OVERDUE TASKS

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

        {/* DASHBOARD */}

        <div style={styles.activeMenu}>

          <FaHome />

          <span style={{
            marginLeft: "12px",
          }}>
            Dashboard
          </span>

        </div>

        {/* PROJECTS */}

        <div
          style={styles.menuItem}
          onClick={() => navigate("/projects")}
        >

          <FaProjectDiagram />

          <span style={{
            marginLeft: "12px",
          }}>
            Projects
          </span>

        </div>

        {/* TASKS */}

        <div
          style={styles.menuItem}
          onClick={() => navigate("/tasks")}
        >

          <FaTasks />

          <span style={{
            marginLeft: "12px",
          }}>
            Tasks
          </span>

        </div>

        {/* TEAM */}

        <div
          style={styles.menuItem}
          onClick={() => navigate("/team")}
        >

          <FaUsers />

          <span style={{
            marginLeft: "12px",
          }}>
            Team
          </span>

        </div>

        {/* LOGOUT */}

        <div
          style={styles.logoutSidebar}
          onClick={logout}
        >

          <FaSignOutAlt />

          <span style={{
            marginLeft: "12px",
          }}>
            Logout
          </span>

        </div>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        {/* TOPBAR */}

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

          {/* TOTAL */}

          <div style={styles.card}>

            <h2>Total Tasks</h2>

            <p style={styles.number}>
              {totalTasks}
            </p>

          </div>

          {/* PENDING */}

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

          {/* COMPLETED */}

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

          {/* OVERDUE */}

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

        {/* CREATE TASK */}

        {role === "Admin" && (

          <div style={styles.formContainer}>

            <h2>Create Task</h2>

            {/* TITLE */}

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleChange}
              style={styles.input}
            />

            {/* DESCRIPTION */}

            <textarea
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleChange}
              style={styles.textarea}
            />

            {/* DUE DATE */}

            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              style={styles.input}
            />

            {/* PROJECT */}

            <select
              name="project"
              value={taskData.project}
              onChange={handleChange}
              style={styles.input}
            >

              <option value="">
                Select Project
              </option>

              {projects.map((project) => (

                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>

              ))}

            </select>

            {/* ASSIGN USER */}

            <select
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
              style={styles.input}
            >

              <option value="">
                Assign User
              </option>

              {users.map((user) => (

                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>

              ))}

            </select>

            {/* STATUS */}

            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option>
                Pending
              </option>

              <option>
                Completed
              </option>

            </select>

            {/* BUTTON */}

            <button
              style={styles.createBtn}
              onClick={createTask}
            >
              Create Task
            </button>

          </div>

        )}

        {/* TASKS */}

        <div style={styles.taskSection}>

          <h2 style={styles.taskHeading}>
            Recent Tasks
          </h2>

          {tasks.map((task) => (

            <div
              key={task._id}
              style={styles.taskCard}
            >

              <div>

                <h3>
                  {task.title}
                </h3>

                <p>
                  {task.description}
                </p>

                <p>
                  <strong>Project:</strong>
                  {" "}
                  {task.project?.title}
                </p>

                <p>
                  <strong>Assigned To:</strong>
                  {" "}
                  {task.assignedTo?.name}
                </p>

                <p>
                  <strong>Due Date:</strong>
                  {" "}

                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No Date"}
                </p>

                <p>

                  Status:

                  <span
                    style={{
                      marginLeft: "8px",

                      color:
                        task.status === "Completed"
                          ? "#10b981"
                          : "#f59e0b",

                      fontWeight: "bold",
                    }}
                  >
                    {task.status}
                  </span>

                </p>

              </div>

              {/* BUTTONS */}

              <div style={{
                display: "flex",
                gap: "10px",
              }}>

                {/* VIEW */}

                <button
                  style={styles.viewBtn}
                  onClick={() =>
                    alert(
                      `Title: ${task.title}

Description: ${task.description}

Project: ${task.project?.title}

Assigned To: ${task.assignedTo?.name}

Due Date: ${
                        task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "No Date"
                      }

Status: ${task.status}`
                    )
                  }
                >
                  View
                </button>

                {/* COMPLETE */}

                {task.status !== "Completed" && (

                  <button
                    style={styles.completeBtn}
                    onClick={() =>
                      markCompleted(task._id)
                    }
                  >
                    Complete
                  </button>

                )}

                {/* DELETE */}

                {role === "Admin" && (

                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      deleteTask(task._id)
                    }
                  >
                    Delete
                  </button>

                )}

              </div>

            </div>
          ))}

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

  formContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    marginTop: "40px",

    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "100px",
    boxSizing: "border-box",
  },

  createBtn: {
    marginTop: "20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  taskSection: {
    marginTop: "50px",
  },

  taskHeading: {
    marginBottom: "20px",
    color: "#111827",
  },

  taskCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  viewBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  completeBtn: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Dashboard;