import { Route, Routes } from "react-router-dom";

import FeedPage from "./routes/FeedPage";
import MapPage from "./routes/MapPage";
import Footer from "./components/Footer";
import Header from './components/Header';

import "./App.css";

const App = () => {
	return (
		<div className="App">
      <Header/>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
			<Footer />
		</div>
	);
};

export default App;
