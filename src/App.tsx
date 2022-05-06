import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FeedPage from "./routes/FeedPage";
import MapPage from "./routes/MapPage";
import { theme } from "./utils/theme";
import apicall from "./utils/apicall";

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
