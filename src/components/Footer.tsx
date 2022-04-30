import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { AppBar, Box, Fab, IconButton, styled, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }} component="footer">
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer">
          <Link to="/" className="link">
            <MapOutlinedIcon />
          </Link>
        </IconButton>
        <StyledFab color="error" aria-label="add">
          <AddIcon />
        </StyledFab>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <Link to="/feed" className="link">
            <FormatListBulletedIcon />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
