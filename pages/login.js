import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      router.push("/"); // Redirect to index if email is present
    }
  }, []);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1b1b1b",
  };

  const errorStyle = {
    color: "#ffa31a",
    margin: "10px 0",
  };

  const handleLogin = async () => {
    if (email) {
      setError("");

      try {
        const response = await axios.post("/api/login", {
          email: email,
        });

        if (response.data.message === "Login successful") {
          localStorage.setItem("email", JSON.stringify(response.data.user));
          router.push("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setError("Login failed. Please check your credentials.");
      }
    } else {
      setError("Please provide valid email");
    }
  };

  return (
    <div style={containerStyle}>
      <Box
        sx={{
          backgroundColor: "#292929",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          width: {
            xs: "350px",
            sm: "500px",
          },
        }}
      >
        <Box
          sx={{
            backgroundImage: `url("/images/main.jpg")`,
            backgroundSize: "50%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "100px",
            mixBlendMode: "lighten",
          }}
        ></Box>

        <TextField
          type="email"
          placeholder="username"
          variant="outlined"
          value={email}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            marginTop: "2rem",
            marginBottom: "2rem",
            color: "white",
            background: "#333",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#555",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#555",
            },
          }}
          InputProps={{
            style: {
              color: "white",
              placeholder: "white",
            },
          }}
        />

        {error && <p style={errorStyle}>{error}</p>}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: "#ffa31a",
            color: "#1b1b1b",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "#ffcc99",
              color: "#1b1b1b",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
