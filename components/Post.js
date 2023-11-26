import React from "react";
import { Paper, Typography, Box, Avatar, IconButton } from "@mui/material";

import { MdClose, MdComment, MdFavorite, MdShare } from "react-icons/md";
const Post = ({ text, username, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(formattedTime);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        marginBottom: 3,
        width: "100%",
        backgroundColor: "#1c1c1c", // Dark background color
        color: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #bdbdbd",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
          {username}
        </Typography>
        <box sx={{ flexGrow: 1 }} />
        <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
          {formattedTime}
        </Typography>
      </Box>
      <Typography sx={{ mb: 2 }}>{text}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{ color: "#bdbdbd", "&:hover": { color: "#ffffff" } }}
          >
            <MdFavorite />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#bdbdbd", ml: 1 }}>
            42
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{ color: "#bdbdbd", "&:hover": { color: "#ffffff" } }}
          >
            <MdComment />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#bdbdbd", ml: 1 }}>
            18
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{ color: "#bdbdbd", "&:hover": { color: "#ffffff" } }}
          >
            <MdShare />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#bdbdbd", ml: 1 }}>
            Share
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Post;
