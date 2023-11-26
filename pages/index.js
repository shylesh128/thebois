import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import Post from "@/components/Post";
import TopAppBar from "@/components/TopAppBar";
import { useRouter } from "next/router";
import { MdSend } from "react-icons/md";

const Home = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(posts);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      router.push("/login");
    } else {
      const usersss = JSON.parse(storedEmail);
      setUser(usersss.email.name);
      setEmail(usersss.email.email);

      const fetchTweets = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            "https://shylesh.onrender.com/api/tweet"
          );

          if (response.ok) {
            const data = await response.json();
            setPosts(data.data.tweets);
            setLoading(false);
          } else {
            console.error("Failed to fetch tweets");
          }
        } catch (error) {
          console.error("Error fetching tweets:", error);
        }
      };

      fetchTweets();
    }
  }, []);

  const addPost = async () => {
    if (newPost.trim() !== "") {
      const newPostObject = {
        tweet: newPost,
        name: user,
        email: email, // Assuming user.email is available
      };

      // Make a POST request to your server to create a new tweet
      try {
        const response = await fetch("https://shylesh.onrender.com/api/tweet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPostObject),
        });

        if (response.ok) {
          const data = await response.json();
          setPosts([...posts, data.data.tweet]);
          setNewPost("");
        } else {
          // Handle error
          console.error("Failed to create tweet");
        }
      } catch (error) {
        console.error("Error creating tweet:", error);
      }
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
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginBottom: "20px",
            marginTop: "2rem",
            padding: "4rem 0",
            overflow: "auto",
          }}
        >
          {loading ? (
            <Typography
              style={{
                width: "100%",
                textAlign: "center",
                color: "#fff",
                fontSize: "20px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Loading...
            </Typography>
          ) : (
            posts.map((post, index) => (
              <Post
                key={index}
                text={post.tweet}
                username={post.name}
                timestamp={post.timeStamp}
              />
            ))
          )}
        </Box>

        <AppBar
          position="fixed"
          color="primary"
          sx={{
            backgroundColor: "black",
            width: "100%",
            top: "auto",
            bottom: 0,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <img
                src="/images/main.jpg"
                alt="pain hub logo"
                style={{
                  height: "50px",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ width: "90%", padding: "10px" }}>
                <TextField
                  fullWidth
                  placeholder="What's happening?"
                  variant="outlined"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  sx={{
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
                  <MdSend color="#fff" size={30} />
                </IconButton>
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Home;
