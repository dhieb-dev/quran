import { useEffect, useState } from "react";

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
          className="fixed right-5 bottom-20 animate-bounce"
        >
          <svg
            className="w-9 h-9 fill-white dark:fill-black"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 11L12 8M12 8L9 11M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              className="stroke-black dark:stroke-white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
};
