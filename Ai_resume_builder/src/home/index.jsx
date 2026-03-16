import Header from "@/components/custom/Header";
import { UserButton } from "@clerk/clerk-react";
import React from "react";

import Spline from "@splinetool/react-spline";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />
      <Spline scene="https://prod.spline.design/9UMo3gB8SmA6EKEG/scene.splinecode" />
    </div>
  );
}

export default Home;
