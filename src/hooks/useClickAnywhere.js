import { useEffect } from "react";

export const useClickAnywhere = (targetRef, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (targetRef.current && !targetRef.current.contains(e.target))
        callback();
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [targetRef, callback]);
};
