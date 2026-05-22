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

function Tasks() {

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
      project: "",
      assignedTo: "",
      dueDate: "",
    });

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

  // HANDLE INPUT

  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE TASK

  const createTask = async (e) => {

    e.preventDefault();

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const data = {
        ...taskData,
        createdBy: user?._id,
      };

      console.log(data);

      const res = await axios.post(
        `${API}/api/tasks/create`,
        data
      );

      console.log(res.data);

      alert("Task created successfully");

      fetchTasks();

      setTaskData({
        title: "",
        description: "",
        status: "Pending",
        project: "",
        assignedTo: "",
        dueDate: "",
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Error creating task"
      );
    }
  };

  // COMPLETE TASK

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

  return (

    <div style={styles.container}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>
          Team Task
        </h2>

        <div
          style={styles.menuItem}
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <FaHome />
          <span style={styles.menuText}>
            Dashboard
          </span>
        </div>

        <div
          style={styles.menuItem}
          onClick={() =>
            navigate("/projects")
          }
        >
          <FaProjectDiagram />
          <span style={styles.menuText}>
            Projects
          </span>
        </div>

        <div style={styles.activeMenu}>
          <FaTasks />
          <span style={styles.menuText}>
            Tasks
          </span>
        </div>

        <div
          style={styles.menuItem}
          onClick={() =>
            navigate("/team")
          }
        >
          <FaUsers />
          <span style={styles.menuText}>
            Team
          </span>
        </div>

        <div
          style={styles.logoutBtn}
          onClick={logout}
        >
          <FaSignOutAlt />
          <span style={styles.menuText}>
            Logout
          </span>
        </div>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        <h1 style={styles.heading}>
          Tasks
        </h1>

        {/* CREATE TASK */}

        {role === "Admin" && (

          <div style={styles.formContainer}>

            <h2>Create Task</h2>

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleChange}
              style={styles.input}
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleChange}
              style={styles.textarea}
            />

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

            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              style={styles.input}
            />

            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              style={styles.input}
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

            <button
              style={styles.createBtn}
              onClick={createTask}
            >
              Create Task
            </button>

          </div>

        )}

        {/* TASKS */}

        <div style={styles.taskGrid}>

          {tasks.map((task) => {

            const isOverdue =
              task.dueDate &&
              new Date(task.dueDate) < new Date() &&
              task.status !== "Completed";

            return (

              <div
                key={task._id}
                style={styles.taskCard}
              >

                <h2>{task.title}</h2>

                <p style={styles.description}>
                  {task.description}
                </p>

                <p>
                  <strong>Project:</strong>{" "}
                  {task.project?.title}
                </p>

                <p>
                  <strong>Assigned To:</strong>{" "}
                  {task.assignedTo?.name || "No User"}
                </p>

                <p>
                  <strong>Due Date:</strong>{" "}

                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No Date"}
                </p>

                <p>

                  <strong>Status:</strong>

                  <span
                    style={{
                      marginLeft: "10px",
                      color: isOverdue
                        ? "red"
                        : task.status === "Completed"
                        ? "#10b981"
                        : "#f59e0b",
                      fontWeight: "bold",
                    }}
                  >

                    {isOverdue
                      ? "Overdue"
                      : task.status}

                  </span>

                </p>

                <div style={styles.buttonContainer}>

                  {task.status !==
                    "Completed" && (

                    <button
                      style={styles.completeBtn}
                      onClick={() =>
                        markCompleted(task._id)
                      }
                    >
                      Complete
                    </button>

                  )}

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
            );
          })}

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
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
  },

  menuText: {
    marginLeft: "12px",
  },

  logoutBtn: {
    marginTop: "40px",
    padding: "16px",
    borderRadius: "10px",
    background: "#ef4444",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
  },

  main: {
    flex: 1,
    padding: "40px",
  },

  heading: {
    fontSize: "42px",
    marginBottom: "30px",
    color: "#111827",
  },

  formContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "40px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "100px",
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

  taskGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
  },

  taskCard: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
  },

  description: {
    marginTop: "10px",
    marginBottom: "15px",
    color: "#6b7280",
  },

  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
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

export default Tasks;