import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CtaSection from "../components/CtaSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Blogdetailed = () => {

  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://redixpresslogistics.com/courier/public/api/detail/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlog(data.data);
        }
      })
      .catch((err) => console.error("Error fetching blog details:", err));
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  const relatedBlogs = [
    {
      id: 1,
      date: "December 2, 2018",
      time: "5min read",
      title: "Innovations In Transport For A Smarter Future",
      desc: "The logistics industry is undergoing a revolution driven by innovative transport technologies. The logistics industry .",
      img: "/image/blog2.png",
      link: "/blog#/blog-detail",
    },
    {
      id: 2,
      date: "January 15, 2021",
      time: "6min read",
      title: "How AI is Transforming Global Shipping",
      desc: "Artificial Intelligence is making logistics smarter and more efficient.AI is Transforming Global Shipping",
      img: "/image/blog3.png",
      link: "/blog#/blog-detail",
    },
  ];

  return (
    <>
      <section className="blog-detail-banner">
        <div className="container">
          <div className="blog-dbcontent">
            <Link to="/blog">Back to blogs</Link>
            <h2>{blog.title}</h2>
            <p>
            {blog.sub_title}
            </p>
            <div className="blog-detail-author">
              <img src="/image/author-blog.png" alt="Author" />
              <p>
                Admin<br></br>
                <small>{blog.created}</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-detail-data">
        <div className="container">
          <div className="blog-dimgmain">
          <img src={blog.image} alt={blog.title} />
          </div>

          <div
            className="article-data"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />


          <div className="blog-detail-share">
            <ul>
              <li>
                <button>
                  {" "}
                  <FontAwesomeIcon icon={faCopy} className="mx-2" /> Copy link
                </button>
              </li>
              <li>
                <button>
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
              </li>
              <li>
                <button>
                  <FontAwesomeIcon icon={faFacebook} />
                </button>
              </li>
              <li>
                <button>
                  <FontAwesomeIcon icon={faLinkedin} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="related-blog">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 col-lg-4 col-sm-12 related-blog-head">
              <h2>Other Updates</h2>
              <p>
                The latest industry news, interviews, technologies, and
                resources.
              </p>
              <Link className="btn btn-primary" to="/blog">View all updates</Link>
            </div>

            <div className="col-md-7 col-lg-8 col-sm-12">
            <div className="row">
              {relatedBlogs.map((relatedBlog) => (
                <div key={relatedBlog.id} className="col-md-6 col-lg-6 col-sm-12 mb-4">
                <div className="blog-item">
                  <div className="blog-item-img">
                    <Link to="#">
                      <img
                        src={relatedBlog.img}
                        className="img-fluid w-100"
                        alt="Blog"
                      />
                    </Link>
                  </div>
                  <div className="blog-item-data">
                    <p>
                      {relatedBlog.date} - <span>{relatedBlog.time}</span>
                    </p>
                    <h3>
                      <a href={relatedBlog.link}>
                        {relatedBlog.title}
                      </a>
                    </h3>
                    <p>{relatedBlog.desc}</p>
                  </div>
                </div>
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

export default Blogdetailed;
