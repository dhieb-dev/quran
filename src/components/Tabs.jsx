import { useContext } from "react";
import DataContext from "../context/DataContext";

export const Tabs = () => {
  const { passReciter, passRewayah, setPassRewayah, setActiveComponent } = useContext(DataContext)
  const hundlaClick = (active) => {
    setPassRewayah({ ...passRewayah, name: null })
    setActiveComponent(active)
  }
  return (
    <nav>
      <ul className="text-sm flex justify-around">
        {passReciter.name &&
          <li
            className="py-1.5 px-3 mx-1.5 bg-white hover:bg-neutral-400/20 dark:bg-black hover:dark:bg-neutral-200/20 rounded-full"
            title={passReciter.name}
            onClick={() => hundlaClick("reciters")}>
            {passReciter.name}
          </li>
        }
        {(passRewayah.name) &&
          <li
            className="py-1.5 px-3 mx-1.5 bg-white hover:bg-neutral-400/20 dark:bg-black hover:dark:bg-neutral-200/20 rounded-full"
            title={passRewayah.name}
            onClick={() => hundlaClick("rewayahs")}>
            {passRewayah.name}
          </li>
        }
      </ul>
    </nav >
  );
};
