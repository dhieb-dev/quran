import { Link } from "react-router";
import { useContext } from "react";
import Context from "../context/Context";

export const Footer = () => {
  const { lang } = useContext(Context);
  return (
    <footer>
      <div className="container mx-auto p-4">
        <div className="flex space-x-2 pb-2 border-b border-gray-300">
          <p className="text-red-400">{lang.native}</p>
          <ul>
            <Link to={"/languages"}>اللغات</Link>
          </ul>
        </div>
        <div className="pt-4 space-y-2">
          <p className="text-center">هذا العمل لوجه الله تعالى</p>
          <button className="block mx-auto">
            <a
              className="text-blue-400 dark:text-blue-400"
              href="https://dhieb.vercel.app"
            >
              Dhieb Dev
            </a>
          </button>
        </div>
      </div>
    </footer>
  );
};
