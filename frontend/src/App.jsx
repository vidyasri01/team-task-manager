import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // PASSWORD STRENGTH CHECK

    if (name === "password") {

      if (value.length < 6) {
        setPasswordStrength("Weak");
      }

      else if (
        value.match(/[A-Z]/) &&
        value.match(/[0-9]/)
      ) {
        setPasswordStrength("Medium");
      }

      if (
        value.match(/[A-Z]/) &&
        value.match(/[0-9]/) &&
        value.match(/[@$!%*?&]/) &&
        value.length >= 8
      ) {
        setPasswordStrength("Strong");
      }
    }
  };

  const handleSubmit = async () => {

    // PASSWORD VALIDATION

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must contain minimum 8 characters, one uppercase letter, one number and one special character"
      );
      return;
    }

    try {

      if (isLogin) {

        // LOGIN API

        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // SAVE TOKEN

        localStorage.setItem("token", res.data.token);

        alert("Login Successful");

        // REDIRECT TO DASHBOARD

        navigate("/dashboard");

      } else {

        // REGISTER API

        await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );

        alert("Registration Successful");

        setIsLogin(true);
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Team Task <br /> Manager
        </h1>

        <h2 style={styles.subtitle}>
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            style={styles.input}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          style={styles.input}
          onChange={handleChange}
        />

        {/* PASSWORD FIELD */}

        <div style={styles.passwordContainer}>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            style={styles.passwordInput}
            onChange={handleChange}
          />

          <span
            style={styles.eyeIcon}
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword
              ? <FaEyeSlash />
              : <FaEye />}
          </span>

        </div>

        {/* PASSWORD RULES */}

        {!isLogin && (

          <div style={styles.rules}>

            Password must contain:
            <br />

            • Minimum 8 characters
            <br />

            • One uppercase letter
            <br />

            • One number
            <br />

            • One special character

          </div>
        )}

        {/* PASSWORD STRENGTH */}

        {!isLogin && (

          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              color:
                passwordStrength === "Weak"
                  ? "red"
                  : passwordStrength === "Medium"
                  ? "orange"
                  : "green",
            }}
          >
            Password Strength: {passwordStrength}
          </div>
        )}

        {!isLogin && (

          <select
            name="role"
            style={styles.input}
            onChange={handleChange}
          >
            <option>Admin</option>
            <option>Member</option>
          </select>
        )}

        <button
          style={styles.button}
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          style={styles.link}
          onClick={() => setIsLogin(!isLogin)}
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
    background: "#f4f6f8",
    fontFamily: "Arial",
  },

  card: {
    background: "white",
    padding: "40px",
    width: "400px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#222",
    lineHeight: "1.1",
    marginBottom: "20px",
  },

  subtitle: {
    marginBottom: "20px",
    color: "#444",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  passwordContainer: {
    position: "relative",
    marginTop: "15px",
  },

  passwordInput: {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  eyeIcon: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#555",
  },

  rules: {
    textAlign: "left",
    marginTop: "10px",
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.6",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },

  link: {
    marginTop: "20px",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default App;