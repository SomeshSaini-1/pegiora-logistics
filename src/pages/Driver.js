import React, { useState } from "react";
import { GoArrowDownRight } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Drivers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    device_token: "website-app",
    status: "1",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "mobile") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 15);
      setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
    } else if (name === "name") {
      const onlyAlphabets = value.replace(/[^a-zA-Z ]/g, "");
      setFormData((prev) => ({ ...prev, [name]: onlyAlphabets }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { name, email, mobile, password, confirmPassword } = formData;
    if (!name.trim()) return toast.error("Name is required");
    if (!/^[A-Za-z\s]+$/.test(name))
      return toast.error("Name must be letters only");
    if (!email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Invalid email");
    if (!/^\d{10,15}$/.test(mobile))
      return toast.error("Mobile must be 10 to 15 digits");
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://redixpresslogistics.com/courier/public/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { data } = response;
      console.log(response.status);
      if (response.status === 200) {
         toast.success("Registration successful! Please login on the mobile app.");
       
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
          device_token: formData.device_token,
          status: "1",
        });
      } else {
        if (Array.isArray(data.message)) {
          data.message.forEach((msg) => toast.error(msg));
        } else if (typeof data.message === "string") {
          toast.error(data.message);
        } else {
          toast.error("Something went wrong.");
        }
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        errors.forEach((msg) => toast.error(msg));
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to register. Please try again.");
      }
    }
  };

  //----faq section-------------
  const faqs = [
    {
      question: "Who can become a driver for your service?",
      answer:
        "Anyone with a vehicle and a valid driver's license can become a driver for our service. We welcome both individuals and businesses to join our network.",
    },
    {
      question: "Is there a background check for drivers?",
      answer:
        "Yes, all drivers undergo a thorough background check before they can join our platform. This ensures the safety and security of our customers.",
    },
    {
      question: "How can I become a partner or affiliate with your company?",
      answer:
        "If you are interested in partnering with us or becoming an affiliate, please contact our business development team through our website. We are open to exploring mutually beneficial opportunities.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const driverProvide = [
    {
      id: 1,
      heading: "Choose your Gigs",
      paragraph:
        "Work when you want—pick the deliveries that fit your schedule.",
      icon: "/image/driver-pro-icon1.svg",
    },
    {
      id: 2,
      heading: "Gigs matched in minutes",
      paragraph: "Get delivery requests instantly and start earning fast.",
      icon: "/image/driver-pro-icon2.svg",
    },
    {
      id: 3,
      heading: "You’re in control",
      paragraph: "Set your own hours and choose the jobs you prefer.",
      icon: "/image/driver-pro-icon3.svg",
    },
    {
      id: 4,
      heading: "Track your earnings",
      paragraph: "Monitor your income in real-time with easy tracking.",
      icon: "/image/driver-pro-icon4.svg",
    },
  ];

  const driverWhy = [
    {
      id: 1,
      heading: "Make More Money Per Trip",
      paragraph:
        "Earn an average of $30+ on local Gigs and even more on long haul deliveries.",
      icon: "/image/driver-why1.gif",
    },
    {
      id: 2,
      heading: "Drive Packages, Not People",
      paragraph: "No need to entertain. Sit back and relax during your drive.",
      icon: "/image/driver-why2.gif",
    },
    {
      id: 3,
      heading: "Choose Your Deliveries",
      paragraph: "Choose when, where, and how you want to make money.",
      icon: "/image/driver-why3.gif",
    },
    {
      id: 4,
      heading: "Know Before You Go",
      paragraph:
        "See guaranteed payout, plus pickup and delivery notes upfront.",
      icon: "/image/driver-why4.gif",
    },
    {
      id: 5,
      heading: "No Minimum Vehicle Standards",
      paragraph: "Get paid to drive your way, no matter what you drive.",
      icon: "/image/driver-why5.gif",
    },
    {
      id: 6,
      heading: "Get Help When You Need It",
      paragraph:
        "Live humans are ready to help whenever you need it with 24/7 phone, email and online support.",
      icon: "/image/driver-why6.gif",
    },
  ];

  return (
    <>
      <section
        className="home-herobanner"
        style={{
          backgroundImage: "url('/image/banner.png')",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12 ">
              <div className="shadow booking-delivery dri-bnnner">
                <h2>
                  Drive with Pegiora – Earn Flexibly with Every Delivery!
                </h2>
                <p className="driver-bpara">
                  Join our network of professional drivers and start earning
                  today. Flexible hours, great pay, and seamless delivery
                  experiences await you!
                </p>

                <Link
                  to="https://redixpresslogistics.com/courier/public"
                  className="btn-start-bnr" target="_blank"
                >
                  Get Started <span className="ms-2">→</span>
                </Link>

                <div className="driver-banr-img">
                  <img src="/image/driver-banner-short.png" alt="redix" />
                </div>
              </div>
            </div>
            {/* Right Section */}
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="bg-white shadow bookingformhome">
                <h2 className="fw-bold">Register yourself as a Driver!</h2>
                <p>Fill in your details to register</p>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="mb-3">
                        <label>Full Name*</label>
                        <div className="input-box">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="mb-3">
                        <label>Phone Number*</label>
                        <div className="input-box">
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="mb-3">
                        <label>Email address*</label>
                        <div className="input-box">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="mb-3">
                        <label>Password*</label>
                        <div className="input-box">
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="mb-3">
                        <label>Confirm Password*</label>
                        <div className="input-box">
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tems-driverregi form-check ms-0">
                    <input
                      type="checkbox"
                      className="form-check-input mx-2"
                      id="exampleCheck1"
                      required
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      I agree to all <Link to="/terms">Terms & Conditions</Link>{" "}
                      and <Link to="/privacy">Privacy Policy</Link>
                    </label>
                  </div>

                  <button type="submit" className="cta-button">
                    Register
                  </button>

                  <p className="signin-text">
                    Already have an account?{" "}
                    <a href="#">Sign in on Mobile App.</a>
                  </p>
                </form>
              </div>

              {/* Footer */}
              <div className="delivery-info mt-3">
                <img
                  src="/image/drivers-emoji.gif"
                  alt="USA"
                  className="point-mpdev"
                />
                <p className="delivery-text">100+ registered drivers</p>
                <img
                  src="/image/map.png"
                  alt="USA"
                  className="delivery-image"
                />
              </div>

              <div className="mt-3 app-download">
                <div className="app-buttons">
                  <p className="download-text">Download the app</p>
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
        </div>
      </section>

      {/* section 2 driver------start------- */}
      <section className="driver-provide-success">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <div className="content-prov-success">
                <h2>What we provide?</h2>
                <p>Here are the ingredients to our recipe for success</p>

                <div className="row mt-4">
                  {driverProvide.map((driverProv, index) => (
                    <div
                      key={driverProv.id}
                      className="col-lg-6 col-md-6 col-sm-12 mb-3"
                    >
                      <div className="driver-prov-feature">
                        <img src={driverProv.icon} alt={driverProv.heading} />
                        <h4>{driverProv.heading}</h4>
                        <p>{driverProv.paragraph}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <div className="driver-prov-img-part">
                <img src="/image/driver-provide.png" alt="Delivery Drivers" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section3-----------start----------- */}
      <section className="redix-driverwhy">
        <div className="container">
          <h2>Why drive with Pegiora</h2>
          <div className="row">
            {driverWhy.map((drivWhy, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="redix-driverwhy-card">
                  <img src={drivWhy.icon} alt={drivWhy.heading} />
                  <h3>{drivWhy.heading}</h3>
                  <p>{drivWhy.paragraph}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* section4--------------- start---------- */}
      <section className="home-faqs">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-5 col-sm-12">
              <h5>
                FAQ <GoArrowDownRight />
              </h5>
              <h2>You’ve Got Questions, We’ve Got Answers</h2>
              <p className="faqs-head-red">
                Everything you need to know about driving with Pegiora—clear,
                quick, and to the point.
              </p>
            </div>
            <div className="col-md-7 col-lg-7 col-sm-12">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className={`faq-button ${
                        openIndex === index ? "que-btn" : ""
                      }`}
                      onClick={() => toggleAccordion(index)}
                    >
                      {faq.question}
                      <span>{openIndex === index ? "x" : "+"}</span>
                    </button>
                    {openIndex === index && (
                      <div className="faq-answer">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Drivers;
