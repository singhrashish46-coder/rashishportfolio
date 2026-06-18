import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Footer from "./components/Footer.jsx";
import Cursor from "./components/Cursor.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0d1117",
            color: "#e2e8f0",
            border: "1px solid rgba(139,92,246,0.3)",
            fontFamily: "Space Grotesk, sans-serif",
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
