import { useContext, useRef } from "react";
import { AudiosContext } from "../context/index";
import { useClickAnywhere } from "../hooks";
import {
  ListIcon,
  NextIcon,
  PlayIcon,
  PrevIcon,
  RegularIcon,
  RepeatOneIcon,
  ShuffleIcon,
  PauseIcon,
} from "../icons/index";

export const ControlsPlayer = ({
  audio,
  audioSrc,
  isPlay,
  setIsPlay,
  audioControls,
  setAudioControls,
  setIsOpen,
  checkUrl,
}) => {
  const { setAudioIndex } = useContext(AudiosContext);
  const listBtn = useRef(null);

  const playOrPause = () => {
    if (audio.paused) {
      setIsPlay(true);
      audio.play();
    } else {
      setIsPlay(false);
      audio.pause();
    }
  };

  useClickAnywhere(listBtn, () => setIsOpen(false));
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
        {isPlay ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        className="next w-5 h-5"
        onClick={() => setAudioIndex((prev) => prev + 1)}
      >
        <NextIcon />
      </button>
      {!checkUrl.includes("radio") && (
        <button
          onClick={() => {
            if (audioControls === null) {
              setAudioControls("shuffle");
            } else if (audioControls === "shuffle") {
              setAudioControls("repeat-one");
            } else {
              setAudioControls(null);
            }
          }}
          className="w-6 h-6"
        >
          {audioControls === "shuffle" ? (
            <ShuffleIcon />
          ) : audioControls === "repeat-one" ? (
            <RepeatOneIcon />
          ) : audioControls === null ? (
            <RegularIcon />
          ) : null}
        </button>
      )}
      <button
        ref={listBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        className="prev w-5 h-5"
      >
        <ListIcon />
      </button>
    </div>
  );
};
