import { useContext } from "react";
import { Context } from "../context/Context";

export const Tabs = () => {
  const {
    passReciter,
    setPassReciter,
    passRewayah,
    setPassRewayah,
    activeComponent,
    setActiveComponent,
  } = useContext(Context);
  const nameReciter = () => {
    setPassReciter();
    setPassRewayah();
    setActiveComponent("reciters");
  };
  const nameRewayah = () => {
    setPassRewayah();
    setActiveComponent("rewayahs");
  };
  return (
    <nav className="max-md:order-1 max-md:mt-2">
      <ul className="text-sm flex">
        {!(activeComponent === "reciters") && (
          <li
            className="py-1.5 px-3 mx-1.5 bg-white hover:bg-neutral-400/20 dark:bg-black hover:dark:bg-neutral-200/20 rounded-full"
            onClick={nameReciter}
          >
            {passReciter.name}
          </li>
        )}
        {activeComponent === "surahs" && passRewayah.name && (
          <li
            className="py-1.5 px-3 mx-1.5 bg-white hover:bg-neutral-400/20 dark:bg-black hover:dark:bg-neutral-200/20 rounded-full"
            onClick={nameRewayah}
          >
            {passRewayah.name}
          </li>
        )}
      </ul>
    </nav>
  );
};
