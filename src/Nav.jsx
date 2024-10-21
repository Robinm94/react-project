import { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleshow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        handleshow(true);
      } else handleshow(false);
    });
  });

  return (
    <div className={`nav${show ? " nav__solid" : ""}`}>
      <img className="nav__logo" src="/logo.png" alt="Cinema.fyi logo" />
      {/* <span className="logo">
        cinema.<span className="logo__mini">fyi</span>
      </span> */}
    </div>
  );
}

export default Nav;
