import "./App.css";
import Footer from "./components/Footer";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { theme } from "./utils/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Footer />
			</div>
		</ThemeProvider>
	);
}

export default App;
