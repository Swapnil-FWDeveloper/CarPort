import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarSellingPage from "./pages/CarSellingPage";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarSellingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
