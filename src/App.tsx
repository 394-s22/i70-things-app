import { Route, Routes } from "react-router-dom";

import FeedPage from "./routes/FeedPage";
import MapPage from "./routes/MapPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { theme } from "./utils/theme";
import Airtable from "airtable";
import useData from "./utils/useData";

import "./App.css";
import axios from "axios";

new Airtable({ apiKey: "keylvCxPGVKWeoE4u" }).base("appXtIml8So8edpwF");

axios.defaults.baseURL =
  "https://api.airtable.com/v0/appXtIml8So8edpwF/reports"; //content type to send with all POST requests

axios.defaults.headers.post["Content-Type"] = "application/json"; //authenticate to the base with the API key
// @ts-ignore
axios.defaults.headers["Authorization"] = "Bearer keylvCxPGVKWeoE4u";

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
