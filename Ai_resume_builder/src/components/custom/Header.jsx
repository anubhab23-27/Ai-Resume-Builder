import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="Headercss sticky top-0 z-50 p-3 px-5 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <img src="/logo.svg" alt="web-logo" width={50} height={50} />
        <span className="text-lg font-semibold">ResumeStudio</span>
      </div>
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
