import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // PASSWORD VALIDATION

  const passwordValidation = () => {

    const password = formData.password;

    const minLength =
      password.length >= 8;

    const hasUpperCase =
      /[A-Z]/.test(password);

    const hasNumber =
      /[0-9]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasNumber,
    };
  };

  const validation =
    passwordValidation();

  // SUBMIT

  const handleSubmit = async () => {

    try {

      setLoading(true);

      // LOGIN

      if (isLogin) {

        const res = await axios.post(
          "https://team-task-manager-production-813d.up.railway.app/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // SAVE TOKEN

        localStorage.setItem(
          "token",
          res.data.token
        );

        // SAVE ROLE

        localStorage.setItem(
          "role",
          res.data.user.role
        );

        // SAVE USER

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        // PASSWORD VALIDATION

        if (
          !validation.minLength ||
          !validation.hasUpperCase ||
          !validation.hasNumber
        ) {

          alert(
            "Password must contain minimum 8 characters, 1 uppercase letter and 1 number"
          );

          setLoading(false);

          return;
        }

        // REGISTER

        await axios.post(
          "https://team-task-manager-production-813d.up.railway.app/api/auth/register",
          formData
        );

        alert(
          "Registration Successful"
        );

        setIsLogin(true);
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        {/* LOGO */}

        <div style={styles.logoCircle}>
          TM
        </div>

        {/* TITLE */}

        <h1 style={styles.title}>
          Team Task
          <br />
          Manager
        </h1>

        {/* SUBTITLE */}

        <h2 style={styles.subtitle}>

          {isLogin
            ? "Welcome Back"
            : "Create Account"}

        </h2>

        {/* NAME */}

        {!isLogin && (

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            style={styles.input}
            onChange={handleChange}
          />

        )}

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          style={styles.input}
          onChange={handleChange}
        />

        {/* PASSWORD */}

        <div style={styles.passwordContainer}>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Enter Password"
            style={styles.passwordInput}
            onChange={handleChange}
          />

          <span
            style={styles.eyeIcon}
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            {showPassword
              ? <FaEyeSlash />
              : <FaEye />}

          </span>

        </div>

        {/* PASSWORD RULES */}

        {!isLogin && (

          <div style={styles.validationBox}>

            <p style={{
              color:
                validation.minLength
                  ? "green"
                  : "red",
            }}>
              • Minimum 8 characters
            </p>

            <p style={{
              color:
                validation.hasUpperCase
                  ? "green"
                  : "red",
            }}>
              • One uppercase letter
            </p>

            <p style={{
              color:
                validation.hasNumber
                  ? "green"
                  : "red",
            }}>
              • One number
            </p>

          </div>

        )}

        {/* ROLE */}

        {!isLogin && (

          <div style={styles.roleContainer}>

            <div
              style={{
                ...styles.roleCard,

                border:
                  formData.role === "Admin"
                    ? "2px solid #2563eb"
                    : "1px solid #d1d5db",
              }}

              onClick={() =>
                setFormData({
                  ...formData,
                  role: "Admin",
                })
              }
            >

              <FaUserShield
                size={28}
              />

              <p style={{
                marginTop: "10px",
              }}>
                Admin
              </p>

            </div>

            <div
              style={{
                ...styles.roleCard,

                border:
                  formData.role === "Member"
                    ? "2px solid #10b981"
                    : "1px solid #d1d5db",
              }}

              onClick={() =>
                setFormData({
                  ...formData,
                  role: "Member",
                })
              }
            >

              <FaUsers
                size={28}
              />

              <p style={{
                marginTop: "10px",
              }}>
                Member
              </p>

            </div>

          </div>

        )}

        {/* BUTTON */}

        <button
          style={styles.button}
          onClick={handleSubmit}
          disabled={loading}
        >

          {loading
            ? "Please Wait..."
            : isLogin
              ? "Login"
              : "Register"}

        </button>

        {/* SWITCH */}

        <p
          style={styles.link}
          onClick={() =>
            setIsLogin(!isLogin)
          }
        >

          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}

        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #eef2ff, #f8fafc)",
    fontFamily: "Arial",
  },

  card: {
    background: "white",
    padding: "45px",
    width: "430px",
    borderRadius: "22px",
    boxShadow:
      "0 4px 25px rgba(0,0,0,0.12)",
    textAlign: "center",
  },

  logoCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 auto 20px",
  },

  title: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#111827",
    lineHeight: "1.1",
    marginBottom: "15px",
  },

  subtitle: {
    marginBottom: "25px",
    color: "#4b5563",
    fontSize: "26px",
  },

  input: {
    width: "100%",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  passwordContainer: {
    position: "relative",
    marginTop: "15px",
  },

  passwordInput: {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  eyeIcon: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#6b7280",
  },

  validationBox: {
    textAlign: "left",
    marginTop: "12px",
    fontSize: "14px",
  },

  roleContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "25px",
  },

  roleCard: {
    flex: 1,
    padding: "18px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.3s",
  },

  button: {
    width: "100%",
    padding: "15px",
    marginTop: "30px",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "17px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  link: {
    marginTop: "25px",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default Login;