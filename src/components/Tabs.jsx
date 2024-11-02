import { useContext } from "react";
import {Context} from "../context/Context";

export const Tabs = () => {
  const { passReciter, passRewayah, setPassRewayah, setActiveComponent } = useContext(Context)
  const hundlaClick = (active) => {
    setPassRewayah({ ...passRewayah, name: null })
    setActiveComponent(active)
  }
  return (
    <nav>
      <ul className="text-sm flex">
        {passReciter.name &&
          <li
            className="py-1.5 px-3 m-1.5 bg-white hover:bg-neutral-400/20 dark:bg-black hover:dark:bg-neutral-200/20 rounded-full"
            title={passReciter.name}
            onClick={() => hundlaClick("reciters")}>
            {passReciter.name}
          </li>
        }
        {(passRewayah.name) &&
          <li
            className="py-1.5 px-3 m-1.5 bg-white hover:bg-neutral-400/20 dark:bg-black hover:dark:bg-neutral-200/20 rounded-full"
            title={passRewayah.name}
            onClick={() => hundlaClick("rewayahs")}>
            {passRewayah.name}
          </li>
        }
      </ul>
    </nav >
  );
};