import React, { useState, useEffect } from "react";
import { FaArrowRight, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import { FiSearch } from "react-icons/fi";
import { GoArrowDownRight } from "react-icons/go";
import axios from "axios";
import {
  FaLocationDot,
  FaCalendar,
  FaClock,
  FaMapPin,
  FaWeightScale,
} from "react-icons/fa6";
import CategorySlider from "../components/CategorySlider";
import CtaSection from "../components/CtaSection";
import {
  LoadScript,
  Autocomplete,
  DirectionsService,
} from "@react-google-maps/api";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const faqs = [
    {
      question: "How do I track my shipment?",
      answer:
        "You can track your shipment using the tracking ID provided at the time of dispatch. Simply enter it on our tracking page to get real-time updates on your delivery status.",
    },
    {
      question: "What are your shipping rates?",
      answer:
        "Our shipping rates vary based on package size, delivery speed, and destination. You can get an instant quote using our rate calculator or by contacting our support team.",
    },
    {
      question: "Can I schedule a pickup?",
      answer:
        "Yes, Pegiora offers scheduled pickups. Log in to your account, choose your preferred pickup time and location, and we’ll take care of the rest.",
    },
    {
      question: "What happens if my shipment is delayed?",
      answer:
        "In the rare case of a delay, we’ll notify you immediately and provide updated delivery details. Our support team is always available to assist and ensure timely resolution.",
    },
    {
      question: "Are there any restricted items for shipping?",
      answer:
        "Yes, certain items like hazardous materials and non-prescribed narcotics are restricted. Please review our prohibited items list before scheduling your shipment.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach us by phone at +1 866-540-7194 or email us through our contact page. Our team is available 24/7 to assist you.",
    },
  ];
  // section7----faq section-----start----------
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [pickupAutocomplete2, setPickupAutocomplete2] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
  const [availabilityMsg, setAvailabilityMsg] = useState("");
  const [dropoffAutoComplete, setDropoffAutoComplete] = useState(null);

  const allowedStates = ["New York", "Ohio"];

  const handlePickupPlaceChanged = () => {
    if (pickupAutocomplete) {
      const place = pickupAutocomplete.getPlace();
      setPickup(place.formatted_address || "");
    }
  };

  const handleDestinationPlaceChanged = () => {
    if (destinationAutocomplete) {
      const place = destinationAutocomplete.getPlace();
      setDestination(place.formatted_address || "");
    }
  };

  const handlePickupChange = () => {
    if (pickupAutocomplete2) {
      const place = pickupAutocomplete2.getPlace();
      setPickup(place.formatted_address || "");
    }
  };
  const handleDropoffChange = () => {
    if (dropoffAutoComplete) {
      const place = dropoffAutoComplete.getPlace();
      setDropoff(place.formatted_address || "");
    }
  };

  const checkAvailability = () => {
    const pickupMatch = allowedStates.some((state) => pickup.includes(state));
    const destinationMatch = allowedStates.some((state) =>
      destination.includes(state)
    );

    if (pickupMatch && destinationMatch) {
      return "✅ Delivery is available for both Pickup and Destination.";
    } else if (pickupMatch || destinationMatch) {
      return "⚠️ Delivery is available for one location, but not both.";
    } else {
      return "❌ Delivery is not available in the selected locations.";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = checkAvailability();
    setAvailabilityMsg(result);
  };

  const [deliveryType, setDeliveryType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const generateTimeSlots = (isToday = false) => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();

    const start = 9;
    const end = 20;

    for (let hour = start; hour < end; hour++) {
      const hour12 = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const label = `${hour12.toString().padStart(2, "0")}:00 ${ampm}`;

      if (!isToday || hour > currentHour) {
        slots.push(label);
      }
    }
    return slots;
  };

  useEffect(() => {
    const isToday = selectedDate === getTodayDate();
    const slots = generateTimeSlots(isToday);
    setTimeSlots(slots);
    setSelectedTime("");
  }, [selectedDate]);

  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get(
          "https://redixpresslogistics.com/courier/public/api/pickup/get-size"
        );
        if (Array.isArray(response.data)) {
          setSizes(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching size data:", error);
      }
    };

    fetchSizes();
  }, []);

  const [priceResult, setPriceResult] = useState(null);

  const calculateDistanceInMiles = async (pickup, dropoff) => {
    const directionsService = new window.google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin: pickup,
          destination: dropoff,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result.routes.length > 0) {
            const distanceText = result.routes[0].legs[0].distance.text; // e.g., "4.3 mi"
            const miles = parseFloat(distanceText.replace(/[^\d.]/g, ""));
            resolve(miles);
          } else {
            reject("Unable to calculate distance");
          }
        }
      );
    });
  };

  const handleSubmitMain = async (e) => {
    e.preventDefault();

    if (!pickup || !dropoff || !selectedSize || !deliveryType) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const miles = await calculateDistanceInMiles(pickup, dropoff);
      console.log("Miles:", miles);

      const response = await fetch(
        `https://redixpresslogistics.com/courier/public/api/front/check-price?size_id=${selectedSize}&miles=${miles}`
      );

      const result = await response.json();
      console.log("Price response:", result);
      setPriceResult(result); // create state: const [priceResult, setPriceResult] = useState(null);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  return (
    <>
      {/* banner section1-------start----------------- */}
      <section
        className="home-herobanner"
        style={{
          backgroundImage: "url('/image/banner.png')",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="shadow booking-delivery">
                <h1>
                  Pegiora Your Full Service Medical and Crowdsource Delivery
                  Service
                </h1>
                <Link
                  to="https://redixpresslogistics.com/courier/public"
                  target="_blank"
                  className="d-none d-lg-block d-xl-block bnr-btnlg-home"
                >
                  Book a delivery now!
                </Link>

                <div className="row sec-innerclinet">
                  <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="Trusted">
                      <div className="image-group">
                        <img
                          src="/image/Ellipse1.png"
                          alt="Trusted"
                          className="rounded-circle trusted-image"
                        />
                        <img
                          src="/image/Ellipse2.png"
                          alt="Trusted"
                          className="rounded-circle trusted-image"
                        />
                        <img
                          src="/image/Ellipse3.png"
                          alt="Trusted"
                          className="rounded-circle trusted-image"
                        />
                        <img
                          src="/image/Ellipse4.png"
                          alt="Trusted"
                          className="rounded-circle trusted-image"
                        />
                      </div>
                      <p className="trusted-text">Trusted by 5k+ People</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="car-container">
                      <h5>Express delivery</h5>
                      <p>
                        We guarantee a delivery that’s as fast as your need!
                      </p>
                      <div className="car-animation">
                        <img src="/image/car.gif" alt="Car" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-lg-none d-xl-none d-md-block d-sm-block">
                  <Link
                    to="https://redixpresslogistics.com/courier/public"
                    target="_blank"
                    className="w-100 mt-1 mb-3 bnr-btnlg-home d-block"
                  >
                    Book a delivery now!
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="delivery-info mt-4 mb-4 d-lg-none d-xl-none d-md-flex d-sm-flex">
                <img
                  src="/image/location-point.gif"
                  alt="USA"
                  className="point-mpdev"
                />
                <p className="delivery-text">37k+ Live deliveries now</p>
                <img
                  src="/image/map.png"
                  alt="USA"
                  className="delivery-image"
                />
              </div>

              <div className="bg-white shadow bookingformhome">
                <h2 className="fw-bold">Book your delivery right away!</h2>
                <p>Fill in your details to book an instant delivery</p>
                <LoadScript
                  googleMapsApiKey="AIzaSyCD4x0zNeNdKVV7QcvJczq9f6tD8O184x8"
                  libraries={["places"]}
                >
                  <form onSubmit={handleSubmitMain}>
                    <div className="mb-3">
                      <label for="pickup">Pickup location</label>
                      <div className="input-box">
                        <FaLocationDot className="icon" />
                        <Autocomplete
                          onLoad={(ac) => setPickupAutocomplete2(ac)}
                          onPlaceChanged={handlePickupChange} className="w-100"
                        >
                          <input
                            type="text"
                            placeholder="Enter your pickup location"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                          />
                        </Autocomplete>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="dropoff">Dropoff location</label>
                      <div className="input-box">
                        <FaMapPin className="icon" />
                        <Autocomplete
                          onLoad={(ac) => setDropoffAutoComplete(ac)}
                          onPlaceChanged={handleDropoffChange} className="w-100"
                        >
                          <input
                            type="text"
                            placeholder="Enter your dropoff location"
                            value={dropoff}
                            onChange={(e) => setDropoff(e.target.value)}
                          />
                        </Autocomplete>
                      </div>
                    </div>
                    <div className="date-time mb-3">
                      <div className="input-box">
                        <FaWeightScale className="icon" />
                        <select
                          id="size"
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                        >
                          <option value="">Select Size</option>
                          {sizes.map((size) => (
                            <option key={size.id} value={size.id}>
                              {size.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="input-box">
                        <FaTruck className="icon" />
                        <select
                          id="delivery_type"
                          value={deliveryType}
                          onChange={(e) => setDeliveryType(e.target.value)}
                        >
                          <option value="">Select Delivery Type</option>
                          <option value="1">Express</option>
                          <option value="2">Schedule</option>
                        </select>
                      </div>
                    </div>
                    {deliveryType === "2" && (
                      <div className="date-time mb-3">
                        <div className="input-box">
                          <FaCalendar className="icon" />
                          <input
                            type="date"
                            id="date"
                            min={getTodayDate()}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          />
                        </div>

                        <div className="input-box">
                          <FaClock className="icon" />
                          <select
                            id="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            disabled={!selectedDate}
                          >
                            <option value="">Select time</option>
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                    <button className="cta-button">Check prices</button>
                    {priceResult && (
                      <div className="price-result mt-2">
                        <p>Estimated Price- <span><b>${priceResult.delivery_cost || "No price returned"}</b></span></p>
                      </div>
                    )}
                  </form>
                </LoadScript>
              </div>

              {/* Footer */}
              <div className="delivery-info mt-3 d-none d-lg-flex d-xl-flex">
                <img
                  src="/image/location-point.gif"
                  alt="USA"
                  className="point-mpdev"
                />
                <p className="delivery-text">37k+ Live deliveries now</p>
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
      {/* banner section1-------end----------------- */}

      {/* section2-------slider-----start-------- */}
      <section className="home-categories-slider">
        <div className="container-fluid py-4">
          <h2>What we deliver?</h2>

          <CategorySlider />
        </div>
      </section>
      {/* section2-------slider----end-------- */}

      {/* section3---- delivery ---start------- */}
      <section className="redixpress-health">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 redhelth-inr">
              <div className="content-helth">
                <h6>Need help with medical deliveries?</h6>
                <h3 data-aos="fade-up">Introducing Pegiora Health</h3>
                <p data-aos="fade-up">
                  Reimagine the way people access healthcare. Pegiora Health
                  delivers a better patient experience with transportation,
                  same-day prescriptions, and home delivery.
                </p>
                <Link to="https://redixpresshealth.com">View More</Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="image-container">
                <img src="/image/deliveryimg.png" alt="Medical Delivery" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section3---- delivery ---end------- */}

      {/* section4-----choose --start--------------- */}
      <section className="home-choose">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div>
                <h3>Why choose us?</h3>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-8">
              <div className="choose-predesc">
                <p>
                  Pegiora is a premier provider of nationwide pharmacy
                  delivery services, specializing in efficient logistics
                  solutions. We are dedicated to facilitating the smooth
                  movement of goods within the industry, ensuring seamless
                  global trade through reliable land transport.
                </p>
              </div>
            </div>
          </div>
          <div className="row choose-cardsIner">
            <div
              className="col-sm-12 col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
            >
              <div className="cho-cimg">
                <img src="/image/image163.png" alt="Pegiora service" />
              </div>
            </div>
            <div
              className="col-sm-12 col-md-6 col-lg-3 mb-4"
              data-aos="fade-down"
            >
              <div className="choose-flipcard">
                <h4>01</h4>
                <h5>We’re the Fastest</h5>
                <p>
                  The moment we receive your request, we optimize routes,
                  contact drivers, and schedule rush deliveries immediately.
                </p>
              </div>
            </div>
            <div
              className="col-sm-12 col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
            >
              <div className="cho-cimg">
                <img src="/image/image164.png" alt="Pegiora service" />
              </div>
            </div>
            <div
              className="col-sm-12 col-md-6 col-lg-3 mb-4"
              data-aos="fade-down"
            >
              <div className="choose-flipcard">
                <h4>02</h4>
                <h5>Operating 24/7</h5>
                <p>
                  Operating 24/7 across two states, we always have a team ready
                  to handle your delivery requests.
                </p>
              </div>
            </div>

            <div
              className="col-sm-12 col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
            >
              <div className="choose-flipcard">
                <h4>03</h4>
                <h5>Assured Safety</h5>
                <p>
                  Efficiently moving businesses forward: our seamless land
                  reliability and convenience.{" "}
                </p>
              </div>
            </div>
            <div
              className="col-sm-12 col-md-6 col-lg-3 mb-4"
              data-aos="fade-down"
            >
              <div className="cho-cimg">
                <img src="/image/image165.png" alt="Pegiora service" />
              </div>
            </div>
            <div
              className="col-sm-12 col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
            >
              <div className="choose-flipcard">
                <h4>04</h4>
                <h5>Trusted delivery partners</h5>
                <p>
                  We carefully vet, choose, and work with every single one of
                  our drivers to ensure they can meet our commitments to
                  efficient driving, safe deliveries, and stellar customer
                  service. 
                </p>
              </div>
            </div>
            <div
              className="col-sm-12 col-md-6 col-lg-3 mb-4"
              data-aos="fade-down"
            >
              <div className="cho-cimg">
                <img src="/image/image166.png" alt="Pegiora service" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* sectio4----choose --end--------- */}

      {/* sectio5------start--map----- */}
      <section className="maphome-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="maphome-content">
                <h3>Where do we operate currently?</h3>
                <p>
                  150+ entities. 200+ local legal experts. Global from day one.
                  Tap into the most extensive coverage on the market, and start
                  hiring, onboarding, and paying anywhere.
                </p>

                <LoadScript
                  googleMapsApiKey="AIzaSyCD4x0zNeNdKVV7QcvJczq9f6tD8O184x8"
                  libraries={["places"]}
                >
                  <form onSubmit={handleSubmit}>
                    <div
                      className="d-lg-flex d-md-flex align-items-center"
                      data-aos="fade-right"
                    >
                      <div className="mx-2">
                        <div className="input-box">
                          <Autocomplete
                            onLoad={(autoC) => setPickupAutocomplete(autoC)}
                            onPlaceChanged={handlePickupPlaceChanged}
                          >
                            <input
                              type="text"
                              value={pickup}
                              onChange={(e) => setPickup(e.target.value)}
                              placeholder="Pickup Location"
                              required
                            />
                          </Autocomplete>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaArrowRight className="zoom-icon ar-mdtb" />
                      </div>
                      <div className="mx-2">
                        <div className="input-box">
                          <Autocomplete
                            onLoad={(autoC) =>
                              setDestinationAutocomplete(autoC)
                            }
                            onPlaceChanged={handleDestinationPlaceChanged}
                          >
                            <input
                              type="text"
                              value={destination}
                              onChange={(e) => setDestination(e.target.value)}
                              placeholder="Destination Location"
                              required
                            />
                          </Autocomplete>
                        </div>
                      </div>
                      <div className="mtfde">
                        <button type="submit">
                          <FiSearch className="zoom-icon" />
                        </button>
                      </div>
                    </div>
                    {availabilityMsg && (
                      <div
                        style={{
                          marginTop: "10px",
                          color: availabilityMsg.includes("Not")
                            ? "red"
                            : "green",
                        }}
                      >
                        {availabilityMsg}
                      </div>
                    )}
                  </form>
                </LoadScript>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className=" map-imgdiv" data-aos="fade-left">
                <img
                  src="/image/map1.png"
                  alt="Medical Delivery"
                  className="main-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6------- supply chain --------- */}
      <section className="home-supchain">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 co-md-6 col-sm-12">
              <div className="chain-head">
                <h2>
                  Streamlined Transport Through Comprehensive Supply Chain
                  Services
                </h2>
                <p>
                  We make end to-end supply chain more easier and smoother for
                  you. Turning your complexity shipment process into smoothest
                  one.
                </p>
              </div>

              <div>
                <ul>
                  <li data-aos="fade-up">
                    <img src="/image/checkbox-circle.svg" alt="icon" />
                    <span>Simplify your logistics shipment</span>
                  </li>
                  <li data-aos="fade-up">
                    <img src="/image/checkbox-circle.svg" alt="icon" />
                    <span>Supporting you end-to-end shipment</span>
                  </li>
                  <li data-aos="fade-up">
                    <img src="/image/checkbox-circle.svg" alt="icon" />
                    <span>Straightforward and efficient shipment</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6 co-md-6 col-sm-12">
              <div className="roadmap-chain" data-aos="zoom-in">
                <img src="/image/roadmap.svg" alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section7------ part redix--------- */}
      <section className="rediexpresspart">
        <div className="container">
          <div>
            <h2>Be a part of Rediexpress</h2>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6" data-aos="fade-up">
              <div className="choosesectiontext">
                <h3>Join as Delivery Driver</h3>
                <p>
                  Are you a qualified commercial or delivery driver looking to
                  become part of our fleet? Get in contact with our team today
                  and we will schedule an interview ASAP.
                </p>

                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-7 part-redix-morebtn">
                    <Link to="/driver" className="knowbtn-part">
                      Know More
                    </Link>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-5">
                    <div className="redix-partimg">
                      <img
                        src="/image/delivery1.png"
                        className="deliveryimg "
                        alt="Pegiora"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6" data-aos="fade-up">
              <div className="choosesectiontext">
                <h3>Be Our Partner</h3>
                <p className="card-text">
                  Pegiora , a leading logistics shipping company, is
                  actively seeking partners to expand our global reach. Join us
                  to leverage our advanced shipping solutions,{" "}
                </p>

                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-6 part-redix-morebtn">
                    <Link to="/contact-us" className="knowbtn-part">
                      Know More
                    </Link>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 ">
                    <div className="redix-partimg">
                      <img
                        src="/image/business2.png"
                        className="deliveryimg"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section8------------------- */}
      <section className="home-faqs">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-5 col-sm-12" data-aos="fade-up">
              <h5>
                FAQ <GoArrowDownRight />
              </h5>
              <h2>You’ve Got Questions, We’ve Got Answers</h2>
              <p className="faqs-head-red">
                Pegiora delivers clarity with every shipment. We’re here to
                help.
              </p>

              <div className="d-flex">
                <button className="btn btn-primary custombutton">
                  General
                </button>
                <button className="btn btn-light custombutton">
                  For Clients
                </button>
              </div>

              <h5 className="text-lg font-semibold">Give us a call</h5>
              <p className="text-blue-500 text-xl font-bold faq-contact-homedd">
                <span>
                  <img src="/image/call-gif.gif" alt="faqs" />
                </span>
                +1 866-540-7194
              </p>
              <h5 className="text-gray-600 mt-4">Location</h5>
              <p className="text-gray-800 faq-contact-homedd">
                <span>
                  <img src="/image/location-contact.gif" alt="faqs" />
                </span>
                1502 Brittain Rd #1058 Akron, OH 44310
              </p>
            </div>
            <div className="col-md-7 col-lg-7 col-sm-12" data-aos="fade-up">
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
      <CtaSection />
    </>
  );
};

export default Home;
