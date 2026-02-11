"use client";

import "./header.css";
//import ThemeToggle from "@/components/theme/ThemeToggle"

export default function Header() {
  

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">Nugi</div>

        {/* Navigation */}
          <nav className="nav">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>


      </div>
    </header>
  );
}
