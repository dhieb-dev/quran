import { useContext } from "react";
import { Context } from "../context/Context";
import { arrows } from "../svgs/arrows";

export const Tabs = () => {
  const {
    passReciter,
    setPassReciter,
    passRewayah,
    setPassRewayah,
    activeComponent,
    setActiveComponent,
  } = useContext(Context);
  const reciter = () => {
    setPassReciter();
    setPassRewayah();
    setActiveComponent("reciters");
  };
  const rewayah = () => {
    setPassRewayah();
    setActiveComponent("rewayahs");
  };
  return (
    <section className="text-xs flex items-center space-x-2 space-x-reverse py-1.5 px-4 bg-main rounded-full animate-scale will-change-[scale]">
      <div className="flex items-center space-x-2 space-x-reverse">
        <button onClick={reciter} className="border-b-2 border-red-300">
          القارئ
        </button>
        {activeComponent !== "reciters" && (
          <>
            {arrows.right}
            <h3>{passReciter.name}</h3>
          </>
        )}
      </div>
      {arrows.right}
      {activeComponent !== "reciters" && (
        <div className="flex items-center space-x-2 space-x-reverse">
          <button onClick={rewayah} className="border-b-2 border-red-300">
            الرواية
          </button>

          {activeComponent === "surahs" && (
            <>
              {arrows.right} <h3>{passRewayah.name}</h3>
            </>
          )}
        </div>
      )}
    </section>
  );
};
