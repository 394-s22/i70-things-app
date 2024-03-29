import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FeedPage from "./routes/FeedPage";
import MapPage from "./routes/MapPage";
import { theme } from "./utils/theme";
import { Box } from "@mui/material";
import useCDOTData from "./hooks/useCDOTData";

const App = () => {
  const { data } = useCDOTData();

  return (
    <ThemeProvider theme={theme}>
      <Box className="App" height="100%">
        <Header />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
