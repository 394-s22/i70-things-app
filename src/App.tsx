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
import { useEffect, useState } from "react";

const App = () => {
  const { data } = useCDOTData();
  
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const getOrg = () => {
    return origin
  }

  const getDst = () => {
    return destination
  }

  useEffect(() => {
    console.log("origin: ", origin)
    console.log("destination: ", destination)
  }, [origin, destination])

  return (
    <ThemeProvider theme={theme}>
      <Box className="App" height="100%">
        <Header />
        <Routes>
          <Route path="/" element={<MapPage setOrigin={setOrigin} setDestination={setDestination} getDst={getDst} getOrg={getOrg}/>} />
          <Route path="/feed" element={<FeedPage/>} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
