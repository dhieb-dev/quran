import { useEffect, useRef } from "react";

export const useElementInView = () => {
  const targetRef = useRef([])

  useEffect(() => {
    const option = {
      root: null,
      marginRoot: "100px",
      threshold: 0,
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "scale-50", "mt-5")
        } else {
          entry.target.classList.add("opacity-0", "scale-50", "mt-5")
        }
      })
    }, option);
    if (targetRef.current) targetRef.current.forEach(el => observer.observe(el))
    return () => {
      if (targetRef.current) targetRef.current.forEach(el => observer.disconnect())
    }
  })
  return {targetRef}
}
