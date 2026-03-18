import Header from "@/components/custom/Header";
import { UserButton } from "@clerk/clerk-react";
import React from "react";

import Spline from "@splinetool/react-spline";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />

      {/* Mobile Gradient Background */}
      <div className="mobile-gradient"></div>

      {/* Hero Content (ONLY mobile) */}
      <div className="hero-content">
        <h1 className="hero-title">
          Build Your Professional <br /> Resume with AI
        </h1>
        <p className="hero-subtitle">
          Create job-ready resumes in minutes using AI-generated content, modern
          templates, and instant PDF downloads.
        </p>
      </div>

      {/* Desktop Spline */}
      <div className="home-spline">
        <Spline scene="https://prod.spline.design/9UMo3gB8SmA6EKEG/scene.splinecode" />
      </div>
    </div>
  );
}

export default Home;
