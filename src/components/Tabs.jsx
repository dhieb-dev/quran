import { useContext } from "react";
import { Context } from "../context/Context";

export const Tabs = () => {
  const {
    passReciter,
    setPassReciter,
    passRewayah,
    setPassRewayah,
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
    <nav>
      <ul className="text-sm flex">
        {passReciter?.name && (
          <li
            className="py-1.5 px-3 m-1.5 bg-white hover:bg-neutral-400/20 dark:bg-black hover:dark:bg-neutral-200/20 rounded-full"
            title={passReciter.name}
            onClick={nameReciter}
          >
            {passReciter.name}
          </li>
        )}
        {passRewayah?.name && (
          <li
            className="py-1.5 px-3 m-1.5 bg-white hover:bg-neutral-400/20 dark:bg-black hover:dark:bg-neutral-200/20 rounded-full"
            title={passRewayah.name}
            onClick={nameRewayah}
          >
            {passRewayah.name}
          </li>
        )}
      </ul>
    </nav>
  );
};
