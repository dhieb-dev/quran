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
    <section className="text-xs flex items-center space-x-2 space-x-reverse">
      <div className="flex items-center space-x-2 space-x-reverse">
        <button onClick={reciter} className="border-b-2 border-red-300">
          القارئ
        </button>
        {activeComponent !== "reciters" && (
          <>
            {arrows.right}
            <p>{passReciter.name}</p>
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
              {arrows.right} <p>{passRewayah.name}</p>
            </>
          )}
        </div>
      )}
    </section>
  );
};
