import { useEffect, useState } from "react";
export const  useResizeObserver = (width) => {
  const [matches, setMatches] = useState(true);
  useEffect(() => {
    const observer = new ResizeObserver(entries => entries[0].contentRect.width > width - 8 ? setMatches(true) : setMatches(false))
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [width]);
  return matches;
};