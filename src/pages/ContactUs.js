import React, { useState } from "react";
import { IoMdMail, IoIosCall } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import CtaSection from "../components/CtaSection";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    country_code: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For mobile input: allow only digits
    if (name === "mobile") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData((prevState) => ({
        ...prevState,
        [name]: onlyDigits,
      }));
    }
    // For name and last_name input: allow only alphabets
    else if (name === "name" || name === "last_name") {
      const onlyAlphabets = value.replace(/[^a-zA-Z ]/g, "");
      setFormData((prevState) => ({
        ...prevState,
        [name]: onlyAlphabets,
      }));
    }
    else if (name === "country_code") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 3);
      setFormData((prevState) => ({
        ...prevState,
        [name]: onlyDigits,
      }));
    } else if (name === "mobile") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prevState) => ({
        ...prevState,
        [name]: onlyDigits,
      }));
    }

    // For other fields
    else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.name.trim()) {
      return toast.error("First Name is required");
    }
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      return toast.error("First Name must contain only letters");
    }

    if (formData.last_name && !/^[A-Za-z\s]+$/.test(formData.last_name)) {
      return toast.error("Last Name must contain only letters");
    }
    if (!/^\d{1,3}$/.test(formData.country_code)) {
      return toast.error("Country code must be exactly 3 digits");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      return toast.error("Mobile number must be exactly 10 digits");
    }

    if (!/^\d+$/.test(formData.mobile)) {
      return toast.error("Mobile number must contain only digits");
    }

    if (!formData.message.trim()) {
      return toast.error("Message is required");
    }

    try {
      const response = await axios.post(
        "https://redixpresslogistics.com/courier/public/api/savecontact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data.status) {
        toast.success(response.data.message || "Message sent successfully!");
        setFormData({
          name: "",
          last_name: "",
          email: "",
          country_code: "",
          mobile: "",
          message: "",
        });
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        toast.error(errorMessages[0]);
      } else {
        toast.error("Failed to send message. Try again later.");
      }
    }
  };

  return (
    <>
      <section className="contact-page-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="shadow contact-banner-box">
                <div>
                  <h2>Connect with Our Team Today!</h2>
                  <p>
                    Get in touch with our experienced logistics team today for
                    expert assistance with all your delivery needs.
                  </p>
                </div>
                <div className="contact-banner-social">
                  <div className="cont-bnr-inrsub">
                    <div className="cbs-icon">
                      <IoMdMail />
                    </div>
                    <h4>Email</h4>
                    <p>info@Pegiora.com</p>
                  </div>
                  <div className="cont-bnr-inrsub">
                    <div className="cbs-icon">
                      <IoIosCall />
                    </div>
                    <h4>Phone</h4>
                    <p>+1 866-540-7194</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-6 col-sm-12">
              <div
                className="contact-form-box"
                style={{
                  backgroundImage: `url('/image/contactbackground.png')`,
                }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-12">
                      <label>First Name*</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="First Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-12 col-lg-12 col-sm-12">
                      <label>Email*</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 col-lg-6 col-sm-12">
                      <label>Country Code</label>
                      <input
                        type="text"
                        name="country_code"
                        placeholder="Country Code (e.g. 1, 91)"
                        value={formData.country_code}
                        onChange={handleChange}
                         maxLength="3"
                      />
                    </div>

                    <div className="col-md-6 col-lg-6 col-sm-12">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="555-090-0000"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength="10"
                      />
                    </div>
                 
                    <div className="col-md-12 col-lg-12 col-sm-12">
                      <label>Message*</label>
                      <textarea
                        name="message"
                        placeholder="Leave us a message..."
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button className="contact-subbtn" type="submit">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section2----------------- */}
      <section className="our-locations-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="p-3 ">
                <h5>Contact us</h5>
                <h3 className="fw-bold">Our locations</h3>
                <p>Come visit our friendly team at one of our offices.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-6 col-sm-12 cont-locations">
              <div className="d-flex align-items-center p-3">
                <CiLocationOn />
                <div>
                  <h4 className="mb-1">New York</h4>
                  <p className="mb-0">
                    100 Flinders Street, Melbourne VIC 3000 AU
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center p-3">
                <CiLocationOn />
                <div>
                  <h4 className="mb-1">Ohio</h4>
                  <p className="mb-0">100 George Street, Sydney NSW 2000 AU</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-12 col-sm-12">
              <div className="cont-map-view">
                <img src="/image/map1.png" alt="map" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
};

export default ContactUs;
