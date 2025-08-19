import React from "react";

const BannerCms = ({ title, subtitle, description }) => {
  return (
    <section className="privacy-banner">
      <div className="container">
        <h5>{title}</h5>
        <h2>{subtitle}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default BannerCms;
