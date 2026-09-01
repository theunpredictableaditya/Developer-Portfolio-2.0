import { useEffect } from "react";
import gsap from "gsap";
import "./CursorBlob.scss";

const CursorBlob = () => {
  useEffect(() => {
    const blob = document.querySelector(".cursor-blob");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
    });

    gsap.ticker.add(() => {
      gsap.to(blob, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
      });
    });
  }, []);

  return <div className="cursor-blob">
  </div>;
};

export default CursorBlob;
