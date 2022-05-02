import { Route, Routes } from "react-router-dom";

import FeedPage from "./routes/FeedPage";
import MapPage from "./routes/MapPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { theme } from "./utils/theme";


import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
