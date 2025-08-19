import React from "react";
import AppDownloadSection from "../components/AppDownloadSection";
import CtaSection from "../components/CtaSection";
import { Link } from "react-router-dom";

const Service = () => {
  const serviceCard = [
    {
      id: 1,
      title: "Achieving 99.9% On-Time Delivery Rate",
      description:
        "With a 99.9% on-time delivery rate, Redi Xpress Logistics has built a reputation for speed and precision. Whether handling medical specimens, urgent documents, or high-value shipments, we guarantee that every package arrives on schedule and in perfect condition.",
      link: "#",
      image: "/image/service1.png",
    },
    {
      id: 2,
      title: "Implementation of Advanced Tracking Technology",
      description:
        "We integrated real-time tracking into our logistics network, allowing customers to monitor their shipments with accuracy. From medical samples to e-commerce orders, our tracking system ensures visibility, efficiency, and security at every ste",
      link: "#",
      image: "/image/service2.png",
    },
    {
      id: 3,
      title: "Expanding Global Reach to 50+ Countries",
      description:
        "Extending our global footprint to over 50 countries, we're connecting businesses worldwide, fostering Through strategic partnerships and enhanced logistics networks, Redi Xpress Logistics expanded to 50+ countries, connecting businesses and ensuring seamless cross-border trade. Our 24/7 operations make international shipping fast, reliable, and hassle-free.growth, and facilitating seamless cross-border trade",
      link: "#",
      image: "/image/service3.png",
    },
    {
      id: 4,
      title: "Reducing Carbon Footprint by 30%",
      description:
        "Cutting carbon emissions by 30%, we prioritize sustainability, implementing eco-friendly practices to protect the environment while delivering exceptional service.",
      link: "#",
      image: "/image/service4.png",
    },
  ];

  const serviceWeDoList = [
    {
      id: 1,
      heading: "Medical Courier Services",
      paragraph:
        "Fast, secure, and compliant delivery of medical supplies and specimens—ensuring reliability where it matters most.",
      icon: "/image/service-wedo-icon1.svg",
    },
    {
      id: 2,
      heading: "Same Day Delivery",
      paragraph:
        "When time is critical, count on Pegiora to deliver the same day—swift, seamless, and always on schedule.",
      icon: "/image/service-wedo-icon2.svg",
    },
    {
      id: 3,
      heading: "Next Flight Out Services",
      paragraph:
        "Urgent shipments? We’ll get your package on the next available flight, combining speed with precision.",
      icon: "/image/service-wedo-icon3.svg",
    },
    {
      id: 4,
      heading: "Legal Courier Services",
      paragraph:
        "Confidential and time-sensitive legal documents delivered securely and on time, every time.",
      icon: "/image/service-wedo-icon4.svg",
    },
    {
      id: 5,
      heading: "Remote Office Pickup",
      paragraph:
        "Convenient pickups from any location—keeping your remote operations running smoothly with dependable logistics.",
      icon: "/image/service-wedo-icon5.svg",
    },
    {
      id: 6,
      heading: "Trade Shows Pickup & Delivery",
      paragraph:
        "On-time delivery and pickup of trade show materials—designed to make your event logistics stress-free and efficient.",
      icon: "/image/service-wedo-icon6.svg",
    },
  ];

  return (
    <>
      <section className="service-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7 col-sm-12">
              <div className="left-serv-bsec">
                <h2>Reliable, Fast, and Secure Logistics Services</h2>
                <p>
                  From medical courier services to e-commerce deliveries, Redi
                  Xpress Logistics ensures seamless, 24/7 shipping tailored to
                  your needs.
                </p>
                <Link to="https://redixpresslogistics.com/courier/public" target="_blank" className="start-btn-service">
                  Get Started <span className="ms-2">→</span>
                </Link>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="col-lg-4 col-md-5 col-sm-12">
              <div className="right-serv-bse">
                <img
                  src="/image/servicebanner.png"
                  alt="Delivery Image"
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="row mt-4">
                <div className="col-lg-4 col-md-6 col-sm-12 serv-bnr-inrsubcard mb-4">
                  <div className="stats-serv-card scgreen">
                    <div className="scds-card">
                      <h3>120K</h3>
                      <h5>Safety Shipped</h5>
                    </div>
                    <p>Ensuring safe and timely deliveries with utmost care.</p>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 serv-bnr-inrsubcard mb-4">
                  <div className="stats-serv-card scwhite">
                    <div className="scds-card">
                      <h3>24/7</h3>
                      <h5>Delivery Services</h5>
                    </div>
                    <p>No time constraints, we operate round the clock.</p>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="stats-serv-card scblue">
                    <div className="scds-card">
                      <h3>12K</h3>
                      <h5>Users trusting us</h5>
                    </div>
                    <p>
                      Safe handling of all shipments, including medical
                      supplies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section2-------------------------- */}
      <section className="service-exp">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-12">
              <div className="service-exp-head">
                <h3>Revolutionizing Delivery Experience</h3>
                <p>
                  Revolutionizing delivery with innovative solutions, we're
                  shaping the future of transportation with cutting-edge
                  technology and seamless operations.
                </p>
              </div>
            </div>

            <div className="col-lg-7 col-md-6 col-sm-12">
              {serviceCard.map((servCard, index) => (
                <div key={servCard.id} className="servive-explist">
                  <h3>{servCard.title}</h3>
                  <img src={servCard.image} alt="On-Time Delivery" />
                  <p>{servCard.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* // section 3------------------- */}
      <section className="service-wedo">
        <div className="container">
          <div className="text-center mb-5">
            <h2>What we do?</h2>
            <p>
              We offer specialized courier and rush delivery services that
              include
            </p>
          </div>

          <div className="row">
            {serviceWeDoList.map((serviceWeDo, index) => (
              <div
                key={serviceWeDo.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-5"
              >
                <div className="serv-wedo-card">
                  <div className="serv-wedo-card-icon">
                    <img src={serviceWeDo.icon} alt={serviceWeDo.heading} />
                  </div>
                  <h3>{serviceWeDo.heading}</h3>
                  <p>{serviceWeDo.paragraph}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppDownloadSection />

      <CtaSection />
    </>
  );
};

export default Service;
