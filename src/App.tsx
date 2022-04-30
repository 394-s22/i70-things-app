import { Route, Routes } from "react-router-dom";

import FeedPage from './routes/FeedPage'
import MapPage from './routes/MapPage'

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<MapPage  />}
        />
        <Route
          path="/feed"
          element={<FeedPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
