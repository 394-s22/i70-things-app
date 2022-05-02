import { Route, Routes } from "react-router-dom";

import FeedPage from "./routes/FeedPage";
import MapPage from "./routes/MapPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./App.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmlraGlsMDkyOSIsImEiOiJjbDJvMWFuM3AxMmFtM2JzM2VwbmZhejZmIn0.LQpNYBoPUTZY4q7EpAGOdg";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
