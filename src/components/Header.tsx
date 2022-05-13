import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";

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
      <AppBar position="static">
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
