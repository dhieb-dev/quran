import { useContext, useEffect, useRef, useState } from "react";
import { ControlsPlayer, ProgressPlayer } from "../components/index";
import AudiosContext from "../context/AudiosContext";

export const PlayerAudio = () => {
  const { audioIndex, audioList } = useContext(AudiosContext);
  const [audioContents, setAudioContents] = useState({
    duration: "00:00",
    currentTime: "00:00",
    progress: "0%",
  });
  const [isPlay, setIsPlay] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioControls, setAudioControls] = useState(null);
  const audioRef = useRef(null);

  // Format Duration and Current Time
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (audioList) setAudioSrc(audioList[audioIndex]);
  }, [audioIndex, audioList]);

  // Update duration, Current Time and Progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => {
      let duration = audio.duration || 0;
      const currentTime = audio.currentTime || 0;
      const progress = ((currentTime / duration) * 100).toFixed(2) + "%";
      if (duration === Infinity) duration = 0;
      setAudioContents((prev) => ({
        ...prev,
        duration: formatTime(duration),
        currentTime: formatTime(currentTime),
        progress,
      }));
    };
    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [audioSrc]);

  return (
    <>
      {audioSrc && (
        <div
          dir="rtl"
          className="fixed bottom-0 right-0 left-0 bg-zinc-200 dark:bg-zinc-900 p-2"
        >
          <ControlsPlayer
            audioSrc={audioSrc}
            audioRef={audioRef.current}
            setIsPlay={setIsPlay}
            isPlay={isPlay}
            audioControls={audioControls}
            setAudioControls={setAudioControls}
          />
          <ProgressPlayer
            ref={audioRef}
            url={audioSrc[1]}
            duration={audioContents?.duration}
            currentTime={audioContents?.currentTime}
            progress={audioContents?.progress}
            isPlay={setIsPlay}
            audioControls={audioControls}
            audioList={audioList}
          />
        </div>
      )}
    </>
  );
};
