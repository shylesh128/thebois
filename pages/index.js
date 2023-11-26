import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import Post from "@/components/Post";
import TopAppBar from "@/components/TopAppBar";
import { useRouter } from "next/router";
import { MdSend } from "react-icons/md";

const Home = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      router.push("/login");
    } else {
      const usersss = JSON.parse(storedEmail);
      setUser(usersss.email.name);
    }
  }, []);

  const addPost = () => {
    if (newPost.trim() !== "") {
      const username = user;
      const timestamp = new Date().toLocaleTimeString();

      const newPostObject = {
        text: newPost,
        username,
        timestamp,
      };

      setPosts([...posts, newPostObject]);
      setNewPost("");
    }
  };

  return (
    <>
      <TopAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: {
              xs: "calc(70vh - 100px)",
              sm: "calc(90vh - 100px)",
            },
            overflow: "auto",
          }}
        >
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: {
              xs: "90%",
              sm: "50%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "100px",
            }}
          >
            <div style={{ width: "90%" }}>
              <TextField
                fullWidth
                placeholder="What's happening?"
                variant="outlined"
                multiline
                rows={1}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                sx={{
                  marginBottom: "10px",
                  color: "white", // Set text color to white
                  background: "#333", // Set background color to dark greyish
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#555", // Set border color to a slightly lighter grey
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#555", // Set border color on hover
                  },
                }}
                InputProps={{
                  style: {
                    color: "white", // Set text color on the input element
                    placeholder: "white", // Set placeholder color to white
                  },
                }}
              />
            </div>
            <div
              style={{
                width: "10%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <IconButton variant="contained" onClick={addPost}>
                <MdSend color="#fff" size={40} />
              </IconButton>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
