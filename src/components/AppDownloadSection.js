import React from "react";
import { Link } from "react-router-dom";

const AppDownloadSection = () => {
  return (
    <section className="terms-mokup">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 col-lg-6 col-sm-12">
            <div className="terms-mokup-content">
              <h2 class="fw-bold">Join 4,000+ users...</h2>
              <ul>
                <li>30-day free trial</li>
                <li>Personalized onboarding</li>
                <li>Access to all features</li>
              </ul>

              <div class="mokup-app-down d-lg-flex">
                <h4 class="">Download the app</h4>
                <div className="d-flex -mok-inr">
                <Link
                  to="https://apps.apple.com/in/app/redixpress/id6499445593"
                  target="_blank"
                >
                  <img
                    src="/image/Mobileapp1.png"
                    alt="App Store"
                    className="store-image"
                  />
                </Link>
                <Link to="https://play.google.com/store/apps" target="_blank">
                  <img
                    src="/image/Mobileapp.png"
                    alt="Google Play"
                    className="store-image"
                  />
                </Link>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-6 col-sm-12 text-center">
            <img
              src="/image/iPhone15.png"
              alt="Mobile App"
              class="phone-mockup"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
