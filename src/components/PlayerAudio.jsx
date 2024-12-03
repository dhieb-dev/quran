import { useContext, useEffect, useRef, useState } from "react";
import { MinMax } from "./index";
import { Context } from "../context/Context";
import { controls } from "../svgs/controls";

export function PlayerAudio() {
  const { passAudio, setPassAudio, saveAllAudios, nextOrPrev, setNextOrPrev } = useContext(Context);
  const [isPlaying, setIsPlaying] = useState(false);
  const [upTime, setUpTime] = useState({ progress: 0 });
  const [showPlayer, setShowPlayer] = useState(true);
  const audioRef = useRef();
  const progressRef = useRef();

  // Update Name and Time Audio
  useEffect(() => {
    if (passAudio) {
      const audio = audioRef.current;
      const handleTimeUpdate = () => {
        if (audio && audio.duration !== Infinity && !isNaN(audio.duration)) {
          const ct = audio.currentTime;
          setUpTime({
            progress: `${(ct / audio.duration) * 100}%`,
            ct: formatTime(ct),
            duration: formatTime(audio.duration),
          });
        }
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [passAudio]);

  // Select Time Audio
  useEffect(() => {
    const progress = progressRef.current;
    const selectTime = (e) => {
      if (audioRef.current && progress) {
        const clickPositionX = e.offsetX;
        const progressBarWidth = progress.offsetWidth;
        const duration = audioRef.current.duration;
        if (duration > 0) {
          audioRef.current.currentTime =
            (clickPositionX / progressBarWidth) * duration;
        }
      }
    };
    progress.addEventListener("click", selectTime);
    return () => progress.removeEventListener("click", selectTime);
  }, []);

  // Play/Pause Toggle
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Navigation Function
  useEffect(() => {
    if (nextOrPrev < 0) setNextOrPrev(saveAllAudios.length - 1);
    else if (nextOrPrev >= saveAllAudios.length) setNextOrPrev(0);
    else if (nextOrPrev >= 0) {
      setPassAudio({
        url: saveAllAudios[nextOrPrev].url,
        name: saveAllAudios[nextOrPrev].name,
      });
    }
  }, [nextOrPrev, saveAllAudios, setPassAudio, setNextOrPrev]);

  // Format Time
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(Math.floor(time % 60)).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // JSX Code
  return (
    <div
      dir="ltr"
      className={`${
        !showPlayer ? "w-10 bg-transparent" : "px-2 py-1 space-y-2"
      } duration-500 fixed bottom-0 left-4 right-4 mb-4 bg-gradient-to-br from-blue-100 to-green-200 dark:from-neutral-800 dark:to-slate-900 rounded`}
    >
      <div className="flex justify-between">
        {showPlayer ? (
          <>
            <MinMax
              signal={showPlayer}
              onClick={() => setShowPlayer(!showPlayer)}
            />
            <div className="controls flex justify-around items-center w-1/2">
              <button
                className="w-6"
                onClick={() => setNextOrPrev((prev) => prev + 1)}
              >
                {controls.next}
              </button>
              <button
                className="w-6"
                onClick={passAudio ? togglePlayPause : null}
              >
                {isPlaying ? controls.pause : controls.play}
              </button>
              <button
                className="w-6"
                onClick={() => setNextOrPrev((prev) => prev - 1)}
              >
                {controls.prev}
              </button>
            </div>
            <div className="info">{passAudio.name || "-------"}</div>
          </>
        ) : (
          <div className="absolute bottom-0 flex flex-col items-center">
            <MinMax
              signal={showPlayer}
              onClick={() => setShowPlayer(!showPlayer)}
            />
            <button onClick={togglePlayPause} className="w-10 mt-2">
              {isPlaying ? controls.pause : controls.play}
            </button>
          </div>
        )}
      </div>
      <div
        className={`${
          showPlayer ? "flex" : "hidden"
        } text-sm items-center space-x-2`}
      >
        <div className="current-time">{upTime.ct || "00:00"}</div>
        <div
          ref={progressRef}
          title="Progress Audio"
          className="progress relative h-2 w-full rounded bg-blue-300 cursor-pointer"
        >
          {passAudio && (
            <audio
              ref={audioRef}
              src={passAudio.url}
              autoPlay
              type="audio/mpeg"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          )}
          <div
            className="absolute left-0 h-full rounded bg-black dark:bg-white duration-100"
            style={{ width: upTime.progress }}
          ></div>
        </div>
        <div className="duration text-right">{upTime.duration || "00:00"}</div>
      </div>
    </div>
  );
}
