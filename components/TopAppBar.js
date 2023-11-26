import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const TopAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          backgroundColor: "black",

          bottom: "auto",
          top: 0,
        }}
      >
        <Toolbar>
          <img
            src="/images/main.jpg"
            alt="pain hub logo"
            style={{
              height: "50px",
            }}
          />

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopAppBar;
