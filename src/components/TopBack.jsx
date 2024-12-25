import { useEffect, useState } from "react";
import { arrows } from "../svgs/arrows";

export const TopBack = () => {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) setFixed(true);
      else setFixed(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixed]);
  return (
    <>
      {fixed && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="animate-scale fixed duration-1000 right-5 bottom-20 w-8 h-8"
        >
          {arrows.top}
        </button>
      )}
    </>
  );
};
