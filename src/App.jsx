import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDoc from "./pages/ProjectDoc";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDoc />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
