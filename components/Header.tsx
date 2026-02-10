"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./header.css";
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">MyApp</div>

        {/* Navigation */}
        <nav className="nav">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Theme toggle */}
        <ThemeToggle/>
      </div>
    </header>
  );
}
