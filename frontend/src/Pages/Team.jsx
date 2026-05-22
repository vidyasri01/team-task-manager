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

function Team() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);

  // MODAL STATE

  const [selectedUser, setSelectedUser] =
    useState(null);

  // FETCH USERS + TASKS

  useEffect(() => {

    fetchUsers();
    fetchTasks();

  }, []);

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

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "https://team-task-manager-production-1e1e.up.railway.app/api/tasks"
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <div style={styles.container}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>
          Team Task
        </h2>

        {/* DASHBOARD */}

        <div
          style={styles.menuItem}
          onClick={() => navigate("/dashboard")}
        >

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

        <div style={styles.activeMenu}>

          <FaUsers />

          <span style={{
            marginLeft: "12px",
          }}>
            Team
          </span>

        </div>

        {/* LOGOUT */}

        <div
          style={styles.logoutBtn}
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

        <h1 style={styles.heading}>
          Team Members
        </h1>

        <div style={styles.teamGrid}>

          {users.map((user) => (

            <div
              key={user._id}
              style={styles.memberCard}
              onClick={() =>
                setSelectedUser(user)
              }
            >

              {/* AVATAR */}

              <div style={styles.avatar}>
                {user.name?.charAt(0)}
              </div>

              {/* NAME */}

              <h2>
                {user.name}
              </h2>

              {/* EMAIL */}

              <p style={styles.email}>
                {user.email}
              </p>

              {/* ROLE */}

              <div
                style={{
                  ...styles.roleBadge,

                  background:
                    user.role === "Admin"
                      ? "#2563eb"
                      : "#10b981",
                }}
              >
                {user.role}
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* MODAL */}

      {selectedUser && (

        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            {/* BIG AVATAR */}

            <div style={styles.bigAvatar}>
              {selectedUser.name?.charAt(0)}
            </div>

            {/* NAME */}

            <h2 style={{
              marginTop: "20px",
              color: "#111827",
            }}>
              {selectedUser.name}
            </h2>

            {/* INFO BOX */}

            <div style={styles.infoBox}>

              <p style={styles.infoText}>
                <strong>Full Name:</strong>
                {" "}
                {selectedUser.name}
              </p>

              <p style={styles.infoText}>
                <strong>Email:</strong>
                {" "}
                {selectedUser.email}
              </p>

              <p style={styles.infoText}>
                <strong>Role:</strong>
                {" "}

                <span style={{
                  color:
                    selectedUser.role === "Admin"
                      ? "#2563eb"
                      : "#10b981",

                  fontWeight: "bold",
                }}>
                  {selectedUser.role}
                </span>

              </p>

              <p style={styles.infoText}>
                <strong>Joined Date:</strong>
                {" "}
                21 May 2026
              </p>

              <p style={styles.infoText}>
                <strong>Assigned Tasks:</strong>
                {" "}

                {
                  tasks.filter(
                    (task) =>
                      task.assignedTo?._id ===
                      selectedUser._id
                  ).length
                }

                {" "}Tasks
              </p>

            </div>

            {/* CLOSE BUTTON */}

            <button
              style={styles.closeBtn}
              onClick={() =>
                setSelectedUser(null)
              }
            >
              Close
            </button>

          </div>

        </div>
      )}

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

  teamGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",

    gap: "25px",
  },

  memberCard: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    cursor: "pointer",

    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)",
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: "30px",
    fontWeight: "bold",

    margin: "0 auto 20px",
  },

  email: {
    color: "#6b7280",
    marginTop: "10px",
  },

  roleBadge: {
    marginTop: "20px",
    display: "inline-block",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    background: "rgba(0,0,0,0.5)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    zIndex: 1000,
  },

  modal: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "420px",
    textAlign: "center",

    boxShadow:
      "0 4px 20px rgba(0,0,0,0.2)",
  },

  bigAvatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: "42px",
    fontWeight: "bold",

    margin: "auto",
  },

  infoBox: {
    marginTop: "25px",
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "left",
  },

  infoText: {
    marginBottom: "15px",
    fontSize: "16px",
    color: "#374151",
  },

  closeBtn: {
    marginTop: "30px",
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Team;