import React from 'react';
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="de-xpress-home" style={{ backgroundImage: "url('/image/banner1.png')" }}>
    <div className="container">
        <h3>
          Unlocking delivery: Delivering experiences
        </h3>
        <p>
          Pegiora is a premier provider of nationwide pharmacy delivery
          services, specializing in efficient logistics solutions. We are
          dedicated to facilitating the smooth movement of goods within the
          industry, ensuring seamless global trade through reliable land
          transport.
        </p>
        <Link to="https://redixpresslogistics.com/courier/public" target="_blank" className="de-xpres-cta">Book a delivery now!</Link>
      </div>     
    </section>
  )
}

export default CtaSection
