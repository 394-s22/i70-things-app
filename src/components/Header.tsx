import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

const offset = {
  position: "absolute",
  zIndex: 1,
  top: "3px",
  left: 0,
  right: 0,
  margin: "0 auto",
};

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed"
        color="primary"
        sx={{ top: 0, bottom: "auto" }}
        component="header">
        <Toolbar sx={{ display: "flex", justifyContent: "Center" }}>
          <Box sx={offset}>
            <img
              width="60px"
              src="/images/i70-things-logo.png"
              alt="i70 Things logo"
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
