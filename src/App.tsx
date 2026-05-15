import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { TopNav } from "./components/TopNav";
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CaseStudyPage } from "./pages/CaseStudyPage";

function AppShell() {
  return (
    <div className="app">
      <div className="app__bg" aria-hidden />
      <div className="app__content">
        <ScrollToTop />
        <TopNav />
        <div className="app__main">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="case/:projectId" element={<CaseStudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
