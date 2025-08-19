import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaArrowUpLong, FaFacebook } from "react-icons/fa6";
import Newsletter from "./Newsletter";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();

  // site preloader js
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // scrollup button code
  let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#101585  ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLinkClick = () => {
    setMenuOpen(false); 
  };

  return (
    <>
      {/* -------= site preloader =--------- */}
      {pageLoaded ? (
        <div>
          <div></div>
          <div className="loder-section left-section"></div>
          <div className="loder-section right-section"></div>
        </div>
      ) : (
        <div className="loader-wrapper">
          <div className="loader"></div>
          <div className="loder-section left-section"></div>
          <div className="loder-section right-section"></div>
        </div>
      )}
      {/* <!-- Topbar Start --> */}
      <header id="header-mainredix" className={isScrolled ? "sticky" : ""}>
        {/* <!-- Navbar Start --> */}
        <nav className="navbar navbar-expand-lg">
          <div className="container logocontainer">
            <Link className="navbar-brand" to="/home">
              <img
                src="/image/logo1.png"
                alt="logo"
                style={{ height: "80px" }}
              />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              onClick={handleToggle}
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
            >
              {menuOpen ? (
                <span style={{ fontSize: "2rem" }}>&times;</span> // X icon
              ) : (
                <span className="navbar-toggler-icon"></span> // Bar icon
              )}
            </button>

            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="https://redixpresshealth.com" target="_blank">
                    Pegiora Health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/driver" ? "current-page" : ""
                    }`}
                    to="/driver" onClick={handleLinkClick} 
                  >
                    Driver
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/service" ? "current-page" : ""
                    }`}
                    to="/service" onClick={handleLinkClick} 
                  >
                    Service
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/blog" ? "current-page" : ""
                    }`}
                    to="/blog" onClick={handleLinkClick} 
                  >
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/contact-us" ? "current-page" : ""
                    }`}
                    to="/contact-us" onClick={handleLinkClick} 
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>

              <button className="btn btn-primary loginbutton">
                <Link
                  className="nav-link text-white" target="_blank"
                  to="https://redixpresslogistics.com/courier/public"
                >
                  Get Started
                </Link>
              </button>
            </div>
          </div>
        </nav>
      </header>
      {/* <!-- Navbar End --> */}

      <Outlet />

      {/* Footer Start */}

      <footer>
        <Newsletter />
        {/* ------content main----- */}
        <div className="container footer-main-cont">
          <div className="row">
            <div className="col-md-4 col-lg-6 col-sm-12">
              <div className="footer-logo">
                <h3>Let’s deliver..</h3>
                <img src="/image/logo1.png" alt="logo" />
              </div>
            </div>
            <div className="col-md-8 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-md-6 col-lg-5 col-sm-12">
                  <div className="footer-company">
                    <h4>Company</h4>
                    <div className="d-flex flex-column justify-content-start mt-4">
                      <Link
                        className="footer-cont-links"
                        to="https://Pegiorahealth.com"
                      >
                        Pegiora Health
                      </Link>
                      <Link className="footer-cont-links" to="/blog">
                        Blogs
                      </Link>
                      <Link className="footer-cont-links" to="/driver">
                        Drivers
                      </Link>
                      <Link className="footer-cont-links" to="/service">
                        Service
                      </Link>
                      <Link className="footer-cont-links" to="/contact-us">
                        Contact us
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-7 col-sm-12">
                  <div className="footer-support">
                    <h4>Support</h4>
                    <div className="d-flex flex-column justify-content-start mt-4">
                      <Link className="footer-cont-links" href="#">
                        <span>
                          <img
                            src="/image/email-gif.gif"
                            alt="App Store"
                          />
                        </span>{" "}
                        info@Pegioralogistics.com
                      </Link>
                      <Link className="footer-cont-links" href="#">
                        <span>
                          <img
                            src="/image/call-gif.gif"
                            alt="App Store"
                          />
                        </span>
                        +1 866-540-7194
                      </Link>
                      <Link className="footer-cont-links" href="#">
                        <span>
                          <img
                            src="/image/location-contact.gif"
                            alt="App Store"
                          />
                        </span>{" "}
                        1502 Brittain Rd #1058 Akron, OH 44310
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-5 col-sm-12">
                  <div className="footer-information">
                    <h4>Information</h4>
                    <div className="d-flex flex-column justify-content-start mt-4">
                      <Link className="footer-cont-links" to="/privacy">
                        Privacy Policy
                      </Link>
                      <Link
                        className="footer-cont-links"
                        to="/terms"
                      >
                        Terms & Condition
                      </Link>
                      {/* <Link className="footer-cont-links" href="#">
                        Licences
                      </Link>
                      <Link className="footer-cont-links" href="#">
                        Settings
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-7 col-sm-12">
                  <div className="footer-appnow">
                    <h4>Download the app now!</h4>

                    <div className="d-flex accordion-body justify-content-center align-items-center mt-4">
                        <Link to="https://apps.apple.com/in/app/redixpress/id6499445593" target="_blank"><img
                        src="/image/Mobileapp1.png"
                        alt="App Store"
                      />
                      </Link>
                       <Link to="https://play.google.com/store/apps" target="_blank">
                      <img
                        src="/image/Mobileapp.png"
                        alt="Google Play"
                      />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 text-lg-start text-md-center mb-3 mb-md-0">
                <p className="m-0">
                  © Copyright 2025 | All Rights Reserved by{" "}
                  <a href="/">Pegiora.</a>
                </p>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 text-lg-end text-md-center">
                <p className="m-0">
                  <span>
                    <Link className="footer-bottom-links" to="https://www.instagram.com/redixpresslogistics" target="_blank">
                      <FaInstagram />
                    </Link>
                  </span>
                  <span>
                    <Link className="footer-bottom-links" to="https://www.facebook.com/redixpresslogistics" target="_blank">
                      <FaFacebook />
                    </Link>
                  </span>
                  <span>
                  <Link className="footer-bottom-links" to="https://www.linkedin.com/company/redi-xpress/" target="_blank">
                      <FaLinkedinIn />
                    </Link>
                   
                  </span>
                  <span>
                  <Link className="footer-bottom-links" href="#" target="_blank">
                      <FaTwitter />
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/*----------------= site scroll code =-------- */}
      <div id="progress">
        <span id="progress-value">
          <FaArrowUpLong />
        </span>
      </div>
    </>
  );
};

export default Layout;
