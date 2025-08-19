import React, { useEffect } from "react";
import { BrowserRouter  as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "aos/dist/aos.css";
import "./css/Style.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RedixpressHealth from "./pages/RedixpressHealth";
import ContactUs from "./pages/ContactUs";
import Service from "./pages/Service";
import Drivers from "./pages/Driver";
import Blogs from "./pages/Blogs";
import Blogdetailed from "./pages/Blogdetailed";
import Teams from "./pages/Teams";
import Privacy from "./pages/Privacy";
import "./css/Responsive.css";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />  {/* Scroll to top on route change */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="redixpress-health" element={<RedixpressHealth />} />
          <Route path="service" element={<Service />} />
          <Route path="driver" element={<Drivers />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="blog/:slug" element={<Blogdetailed/>} />
          <Route path="contact-us" element={<ContactUs/>} />
          <Route path="terms" element={<Teams/>} />
          <Route path="privacy" element={<Privacy/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
