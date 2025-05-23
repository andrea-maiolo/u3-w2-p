import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import WeatherPageDetails from "./components/WeatherPageDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/details/:location" element={<WeatherPageDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
