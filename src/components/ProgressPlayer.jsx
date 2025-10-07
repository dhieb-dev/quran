import { useContext } from "react";
import Context from "../context/Context";

export const ProgressPlayer = ({
  ref,
  url,
  duration,
  currentTime,
  progress,
  isPlay,
  audioControls,
  audioList,
}) => {
  const { setAudioIndex } = useContext(Context);

  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <span className="text-sm font-mono">{currentTime}</span>
      <div className="relative h-2 rounded-md bg-slate-300 flex-1 overflow-hidden">
        {url && (
          <audio
            ref={ref}
            autoPlay
            src={url}
            onPlay={() => isPlay(true)}
            onPause={() => isPlay(false)}
            onEnded={() => {
              if (audioControls === "random") {
                const randomIndex = Math.floor(
                  Math.random() * audioList.length
                );
                setAudioIndex(randomIndex);
              } else if (audioControls === "regular") {
                setAudioIndex((prevIndex) => {
                  const nextIndex = prevIndex + 1;
                  return nextIndex < audioList.length ? nextIndex : 0;
                });
              }
            }}
          ></audio>
        )}
        <span
          style={{ width: progress }}
          className="block absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-md transition-all duration-500 ease-in-out"
        />
      </div>
      <span className="text-sm font-mono">{duration}</span>
    </div>
  );
};
