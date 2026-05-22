import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });

  // FETCH PROJECTS

  useEffect(() => {

    fetchProjects();

  }, []);

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

  // HANDLE INPUT

  const handleChange = (e) => {

    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE PROJECT

  const createProject = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/projects/create",
        {
          ...projectData,

          createdBy: "6a0ef1cc47898507798100bb",

          members: [
            "6a0ef1cc47898507798100bb",
          ],
        }
      );

      alert("Project Created Successfully");

      fetchProjects();

      setProjectData({
        title: "",
        description: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error creating project");
    }
  };

  // DELETE PROJECT

  const deleteProject = async (id) => {

    try {

      await axios.delete(
        `https://team-task-manager-production-1e1e.up.railway.app/api/projects/${id}`
      );

      fetchProjects();

    } catch (error) {

      console.log(error);
    }
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
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </div>

        <div style={styles.activeMenu}>
          Projects
        </div>

        <div
          style={styles.menuItem}
          onClick={() => navigate("/tasks")}
        >
          Tasks
        </div>

        <div
          style={styles.menuItem}
          onClick={() => navigate("/team")}
        >
          Team
        </div>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        <h1 style={styles.heading}>
          Projects
        </h1>

        {/* CREATE PROJECT */}

        <div style={styles.formContainer}>

          <h2>Create Project</h2>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={projectData.title}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={projectData.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button
            style={styles.createBtn}
            onClick={createProject}
          >
            Create Project
          </button>

        </div>

        {/* PROJECT CARDS */}

        <div style={styles.projectGrid}>

          {projects.map((project) => (

            <div
              key={project._id}
              style={styles.projectCard}
            >

              <h2>
                {project.title}
              </h2>

              <p>
                {project.description}
              </p>

              <p>
                Team Members:
                <span style={{
                  marginLeft: "8px",
                  fontWeight: "bold",
                  color: "#2563eb",
                }}>
                  {project.members?.length || 0}
                </span>
              </p>

              <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}>

                <button
                  style={styles.viewBtn}
                  onClick={() =>
                    alert(
                      `Project: ${project.title}\n\nDescription: ${project.description}`
                    )
                  }
                >
                  View
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    deleteProject(project._id)
                  }
                >
                  Delete
                </button>

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
  },

  activeMenu: {
    padding: "16px",
    marginBottom: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#2563eb",
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
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
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

  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
  },

  projectCard: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  viewBtn: {
    background: "#2563eb",
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

export default Projects;