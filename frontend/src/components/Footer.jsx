import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        background: "#0909ob",
        borderTop: "1px solid rgba(255,255,255,0.55)",
        padding: "40px 20px",
        marginTop: "auto",
      }}
    >
      <div
        className="footer-content"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          <h3
            style={{
              color: "#f97316",
              marginBottom: "10px",
            }}
          >
            ShopNest
          </h3>

          <p
            style={{
              color: "#a1a1aa",
              fontSize: "0.9rem",
            }}
          >
            Premium E-Commerce Platform
          </p>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link
            to="/about"
            style={{
              color: "#a1a1aa",
              fontSize: "0.9rem",
            }}
          >
            About Us
          </Link>

          <Link
            to="/return"
            style={{
              color: "#a1a1aa",
              fontSize: "0.9rem",
            }}
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            style={{
              color: "#a1a1aa",
              fontSize: "0.9rem",
            }}
          >
            Disclaimer
          </Link>
        </div>
        <div
          style={{
            color: "#a1a1aa",
            fontSize: "0.9rem",
          }}
        >
          &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
