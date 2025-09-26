import React, { useEffect, useState } from "react";

export const TopBack = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 350 ? setShow(true) : setShow(false);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {show && (
        <button
          className="topBack fixed bottom-20 right-6 w-7 animate-bounce"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              className="fill-[#C4D9FD]"
              d="M0,256c0,141.158,114.842,256,256,256V0C114.842,0,0,114.842,0,256z"
            />
            <path
              className="fill-[#A7C7FC]"
              d="M256,0v512c141.158,0,256-114.842,256-256S397.158,0,256,0z"
            />
            <path
              className="fill-[#5286FA]"
              d="M272.454,161.969c-4.366-4.364-10.283-6.817-16.457-6.817c-6.173,0-12.093,2.453-16.457,6.817 L115.422,286.09c-9.087,9.089-9.087,23.824,0.002,32.914c9.087,9.087,23.822,9.087,32.914-0.002l107.661-107.664l107.669,107.666 c4.541,4.541,10.498,6.814,16.454,6.814c5.956,0,11.913-2.273,16.455-6.817c9.089-9.089,9.089-23.824,0-32.914L272.454,161.969z"
            />
          </svg>
        </button>
      )}
    </>
  );
};
