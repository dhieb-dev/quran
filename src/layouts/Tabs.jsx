import { useLocation } from "react-router";
import { Moshaf } from "./index";
import { GoBack } from "../components";
export const Tabs = ({ nameReciter, setNameReciter }) => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/surahs" && (
        <div className="pb-2 flex justify-between items-center animate-softVision">
          {location.pathname !== "/" && (
            <GoBack nameReciter={nameReciter} setNameReciter={setNameReciter} />
          )}
          {nameReciter && (
            <p className="text-sky-600 font-semibold tracking-wide">
              {nameReciter}
            </p>
          )}
          {location.pathname === "/surahs" && <Moshaf />}
        </div>
      )}
    </>
  );
};
