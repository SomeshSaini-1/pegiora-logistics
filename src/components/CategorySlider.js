import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const CategorySlider = ({ items = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="cards-container1">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`slidercard ${
              hoveredIndex === index ? "highlighted" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="cat-imgup">
              <img src={item.img} alt={item.title} className="card-image" />
            </div>
            <div className="card-bodys">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Example Usage
const items = [
  {
    img: "/image/ell4.png",
    title: "Packages",
    text: "Small, medium, large, oversize, overweight, and custom package requests",
  },
  {
    img: "/image/ell1.png",
    title: "Documents",
    text: "Passport delivery and filling,Visa delivery and filling, Court filings.",
  },
  {
    img: "/image/OIP.webp",
    title: "Healthcare",
    text: "Medical samples,specimen, equipment,devices and supplies.",
  },
  {
    img: "/image/ell2.png",
    title: "Floral",
    text: "Wedding flowers, Funeral flowers, Event flowers, Custom floral requests.",
  },
  {
    img: "/image/ell3.png",
    title: "E-commerce",
    text: "Online purchase, Amazon packages, Dropshiping.",
  },
  {
    img: "/image/ell2.png",
    title: "Valuables",
    text: "Artwork, Jewerly, Gems, Furniture, Glassware, Antiques, Furs, Rugs, Etc.",
  },
];

export default function App() {
  return <CategorySlider items={items} />;
}
