import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import CtaSection from "../components/CtaSection";
const Blogs = () => {
  // aos using--------------
  useEffect(() => {
    AOS.init({
      duration: 3000, // Animation duration (1s)
      offset: 100, // Offset before animation starts
      easing: "ease-in-out", // Easing function
      once: false, // Animation only once
    });
  }, []);

  const [blogData, setBlogData] = useState([]);
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    fetch("https://redixpresslogistics.com/courier/public/api/bloglist")
      .then((response) => response.json())
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) {
          setLatestBlog(data.blogs[0]);
          setBlogData(data.blogs.slice(1));
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <>
      {/*  ------------ latest one blog---------- */}
      <section
        className="blog-banner"
        style={{ backgroundImage: "url('/image/blogbanner.png')" }}
      >
        <div className="overlay">
          <div className="container">
            <div className="blogs-content">
              <h5>{latestBlog?.created}</h5>
              <h2>{latestBlog?.title}</h2>
              <p>{latestBlog?.sub_title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------ remaining blogs skip latest one ----------- */}
      <section className="blog-content">
        <div className="container">
          <h2>Our Latest Updates</h2>
          <p>
            Insights, Tips, and News Await: Dive into Our Blog for the Latest in
            Logistics
          </p>

          <div className="row mt-4">
            {blogData.map((blog, index) => (
              <div
                key={blog.id}
                className="col-md-6 col-lg-4 col-xl-4 col-sm-12 mb-4"
              >
                <div className="blog-item">
                  <div className="blog-item-img">
                    <Link to="#">
                      <img
                        src={blog.image}
                        className="img-fluid w-100"
                        alt="Blog"
                      />
                    </Link>
                  </div>
                  <div className="blog-item-data">
                    <p> {blog.created}</p>
                    <h3>
                      <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                    </h3>
                    <p>{blog.sub_title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* section------blog------end---------- */}

      <CtaSection />
    </>
  );
};

export default Blogs;
