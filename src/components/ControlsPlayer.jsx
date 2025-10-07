import { useContext } from "react";
import AudiosContext from "../context/AudiosContext";
import {
  NextIcon,
  PlayIcon,
  PrevIcon,
  RegularIcon,
  ShuffleIcon,
  StopIcon,
} from "../icons/index";

export const ControlsPlayer = ({
  audioRef,
  audioSrc,
  isPlay,
  setIsPlay,
  audioControls,
  setAudioControls,
}) => {
  const { setAudioIndex } = useContext(AudiosContext);

  // Click Btns Play Or Pause
  const playOrPause = () => {
    const audio = audioRef;
    if (audio.paused) {
      setIsPlay(true);
      audio.play();
    } else {
      setIsPlay(false);
      audio.pause();
    }
  };
  return (
    <div className="controls flex justify-around items-center mb-2">
      {audioSrc && <p>{audioSrc[0]}</p>}
      <button
        onClick={() => setAudioIndex((prev) => prev - 1)}
        className="prev w-5 h-5"
      >
        <PrevIcon />
      </button>
      <button onClick={playOrPause} className="play-pause w-6 h-6">
        {isPlay ? <PlayIcon /> : <StopIcon />}
      </button>
      <button
        className="next w-5 h-5"
        onClick={() => setAudioIndex((prev) => prev + 1)}
      >
        <NextIcon />
      </button>
      <button
        onClick={() => {
          if (audioControls === null) {
            setAudioControls("regular");
          } else if (audioControls === "regular") {
            setAudioControls("shuffle");
          } else if (audioControls === "random") {
            setAudioControls("repeat-one");
          } else {
            setAudioControls(null);
          }
        }}
        className={`w-6 h-6 ${audioControls === null && "opacity-20"}`}
      >
        {audioControls === "shuffle" ? (
          <ShuffleIcon />
        ) : audioControls === "repeat-one" ? (
          <p>one</p>
        ) : audioControls === "regular" ? (
          <RegularIcon />
        ) : (
          <p>off</p>
          // <RepeatOffIcon className="w-6 h-6" /> // أو تخليه فاضي/شفاف
        )}
      </button>
    </div>
  );
};
