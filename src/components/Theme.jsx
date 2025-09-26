import { useEffect, useState } from "react";
export const Theme = () => {
  const [theme, setTheme] = useState(localStorage.dark ? true : false);
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("dark");
    }
  }, [theme]);
  return (
    <button
      onClick={() => setTheme((prev) => !prev)}
      className="w-8 h-8 p-1.5 rounded-full bg-slate-200 dark:bg-slate-800"
    >
      {theme ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
          <path
            id="light33"
            d="M8,4.818A3.182,3.182,0,1,0,11.182,8,3.183,3.183,0,0,0,8,4.818ZM1.636,8.636H2.909a.636.636,0,0,0,0-1.273H1.636a.636.636,0,1,0,0,1.273Zm11.455,0h1.273a.636.636,0,1,0,0-1.273H13.091a.636.636,0,0,0,0,1.273Zm-5.727-7V2.909a.636.636,0,0,0,1.273,0V1.636a.636.636,0,1,0-1.273,0Zm0,11.455v1.273a.636.636,0,1,0,1.273,0V13.091a.636.636,0,0,0-1.273,0ZM4.175,3.278a.634.634,0,0,0-.9.9l.675.675a.634.634,0,1,0,.9-.9Zm7.872,7.872a.634.634,0,1,0-.9.9l.675.675a.634.634,0,0,0,.9-.9Zm.675-6.975a.634.634,0,0,0-.9-.9l-.675.675a.634.634,0,1,0,.9.9ZM4.85,12.047a.634.634,0,1,0-.9-.9l-.675.675a.634.634,0,0,0,.9.9Z"
            transform="translate(-1 -1)"
            fill="#fb9426"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
          <path
            id="dark33"
            d="M10,3a7,7,0,1,0,7,7,7.873,7.873,0,0,0-.078-1.058,4.2,4.2,0,1,1-5.864-5.864A7.873,7.873,0,0,0,10,3Z"
            transform="translate(-3 -3)"
            fill="#030d28"
          />
        </svg>
      )}
    </button>
  );
};
