'use client'
import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (menu) => {
    setActiveSubMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Brand</div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <li><a href="#home">Home</a></li>
        <li>
          <button onClick={() => toggleSubMenu("about")} className="submenu-toggle">
            About Us
          </button>
          <ul className={`submenu ${activeSubMenu === "about" ? "open" : ""}`}>
            <li><a href="#our-history">Our History</a></li>
            <li><a href="#our-values">Our Values</a></li>
            <li><a href="#our-products">Our Products</a></li>
            <li><a href="#our-strategies">Our Strategies</a></li>
            <li><a href="#our-leadership">Our Leadership</a></li>
          </ul>
        </li>
        <li>
          <button onClick={() => toggleSubMenu("projects")} className="submenu-toggle">
            Our Projects
          </button>
          <ul className={`submenu ${activeSubMenu === "projects" ? "open" : ""}`}>
            <li><a href="#rutongo">Rutongo</a></li>
            <li><a href="#nyakabingo">Nyakabingo</a></li>
            <li><a href="#musha">Musha</a></li>
          </ul>
        </li>
        <li><a href="#sustainability">Sustainability</a></li>
        <li>
          <button onClick={() => toggleSubMenu("investors")} className="submenu-toggle">
            Investors Relations
          </button>
          <ul className={`submenu ${activeSubMenu === "investors" ? "open" : ""}`}>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#latest-news">Latest News</a></li>
            <li><a href="#photos-videos">Photos and Videos</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
