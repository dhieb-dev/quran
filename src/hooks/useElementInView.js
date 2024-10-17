import { useEffect, useRef } from "react";

export const useElementInView = () => {
  const targetRef = useRef([])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("in-view")
        } else {
          entry.target.classList.add("in-view")
        }
      })
    }, option);
    targetRef.current.forEach((el) => {
      if (el instanceof Element) observer.observe(el);
    });
    return () => {
      targetRef.current.forEach((el) => {
        if (el instanceof Element) observer.unobserve(el);
      });
    }
  })
  return { targetRef }
}