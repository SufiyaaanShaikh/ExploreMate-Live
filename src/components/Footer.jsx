import React from "react";
import { Link } from "react-router-dom";

const images = require.context("../images", false, /\.(png|jpe?g|svg)$/);

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="w-100">
        <div className="sec flex pad">
          <div className="footer-column w-100 flex">
            <div className="footer-block footer-logo flex">
              <Link to="#" className="">
                <img src={images("./Explore.svg")} alt="logo" />
              </Link>
              <div className="follow">
                <h3 className="fw-500">Follow us</h3>
                <div className="container">
                  <div className="card">
                    <Link to="#" className="social">
                      <img
                        src={images("./instagram.svg")}
                        alt="social-icon"
                        className="invert"
                      />
                    </Link>
                  </div>
                  <div className="card">
                    <Link to="#" className="social">
                      <img
                        src={images("./twitter.svg")}
                        alt="social-icon"
                        className="invert"
                      />
                    </Link>
                  </div>
                  <div className="card">
                    <Link to="#" className="social">
                      <img
                        src={images("./linkedin.svg")}
                        alt="social-icon"
                        className="invert"
                      />
                    </Link>
                  </div>
                  <div className="card">
                    <Link to="#" className="social">
                      <img
                        src={images("./youtube.svg")}
                        alt="social-icon"
                        className="invert"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-block">
              <h3 className="fw-500">Pages</h3>
              <Link to="/review" className="link para-c flex">
                Review
              </Link>
              <Link to="#" className="link para-c flex">
                About
              </Link>
              <Link to="#" className="link para-c flex">
                Contact
              </Link>
              <Link to="#" className="link para-c flex">
                Destination
              </Link>
            </div>
            <div className="footer-block">
              <h3 className="fw-500">Legal</h3>
              <Link to="#" className="link para-c flex">
                Terms
              </Link>
              <Link to="#" className="link para-c flex">
                Privacy
              </Link>
              <Link to="#" className="link para-c flex">
                Support
              </Link>
              <Link to="#" className="link para-c flex">
                Help Centre
              </Link>
            </div>
            <div className="footer-block social-block">
              <h3 className="fw-500">Socials</h3>
              <div className="card">
                <Link to="#" className="social">
                  {/* <img
                    src={images("./instagram.svg")}
                    alt="social-icon"
                    className="invert"
                  /> */}
                  <span className="link para-c flex">Instagram</span>
                </Link>
              </div>
              <div className="card">
                <Link to="#" className="social">
                  {/* <img
                    src={images("./twitter.svg")}
                    alt="social-icon"
                    className="invert"
                  /> */}
                  <span className="link para-c flex">Twitter</span>
                </Link>
              </div>
              <div className="card">
                <Link to="#" className="social">
                  {/* <img
                    src={images("./linkedin.svg")}
                    alt="social-icon"
                    className="invert"
                  /> */}
                  <span className="link para-c flex">LinkedIn</span>
                </Link>
              </div>
              <div className="card">
                <Link to="#" className="social">
                  {/* <img
                    src={images("./youtube.svg")}
                    alt="social-icon"
                    className="invert"
                  /> */}
                  <span className="link para-c flex">YouTube</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom text-center">
            <small>
              © {currentYear} ExploreMates. All rights reserved
            </small>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;