import { useEffect, useRef } from "react";

export const useElementInView = () => {
  const targetRef = useRef([]);

  useEffect(() => {
    const target = targetRef.current;
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-30", "scale-y-0");
        } else {
          entry.target.classList.add("opacity-30", "scale-y-0");
        }
      });
    }, option);
    target.forEach((el) => {
      if (el instanceof Element) observer.observe(el);
    });
    return () => {
      target.forEach((el) => {
        if (el instanceof Element) observer.unobserve(el);
      });
    };
  }, []);
  return { targetRef };
};
