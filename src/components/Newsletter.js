import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://redixpresslogistics.com/courier/public/api/savenewsletter",
        {
          email: email,
        }
      );

      // console.log(response.data);
      toast.success("Subscribed successfully!", { autoClose: 3000 });
      setEmail("");
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data && error.response.data.errors) {
        toast.error(error.response.data.errors.email[0], { autoClose: 3000 });
      } else {
        toast.error("This email is already subscribed.", {
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="newsletter-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="news-footer-cont">
              <h3>Join our newsletter</h3>
              <p>Delivery services that has your back.</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <form onSubmit={handleSubmit}>
              <div className="footer-newsletter-form">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="news-footer-btn">
                  Subscribe
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
