import { AppBar, Toolbar, IconButton, Box, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const StyledFab = styled(Fab)({
	position: "absolute",
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: "0 auto",
});

function Footer() {
	return (
		<AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }} component="footer">
			<Toolbar>
				<IconButton color="inherit" aria-label="open drawer">
					<MapOutlinedIcon />
				</IconButton>
				<StyledFab color="secondary" aria-label="add">
					<AddIcon />
				</StyledFab>
				<Box sx={{ flexGrow: 1 }} />
				<IconButton color="inherit">
					<FormatListBulletedIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
export default Footer;
