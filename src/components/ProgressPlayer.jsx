import { useContext, useEffect, useRef, useState } from "react";
import AudiosContext from "../context/AudiosContext";

export const ProgressPlayer = ({
  setAudio,
  url,
  isPlay,
  audioControls,
  audioList,
}) => {
  const { setAudioIndex } = useContext(AudiosContext);
  const audioRef = useRef(null);
  const [audioContents, setAudioContents] = useState({
    duration: "00:00",
    currentTime: "00:00",
    progress: "0%",
  });

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Update duration, Current Time and Progress
  useEffect(() => {
    if (audioRef && audioRef.current) setAudio(audioRef.current);
    const audio = audioRef.current;
    const updateTime = () => {
      let duration = audio.duration || 0;
      if (duration === Infinity) duration = 0;
      const currentTime = audio.currentTime || 0;
      const progress = ((currentTime / duration) * 100).toFixed(2) + "%";

      setAudioContents((prev) => ({
        ...prev,
        duration: formatTime(duration),
        currentTime: formatTime(currentTime),
        progress: duration === 0 ? 0 : progress,
      }));
    };
    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [audioContents]);

  const AudioEnd = () => {
    audioControls === "shuffle"
      ? setAudioIndex(Math.floor(Math.random() * audioList.length))
      : audioControls === "repeat-one"
      ? audioRef.current.play()
      : audioControls === null
      ? setAudioIndex((prev) => (prev + 1 < audioList.length ? prev : 0))
      : null;
  };

  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <span className="text-sm font-mono">{audioContents.currentTime}</span>
      <div className="relative h-2 rounded-md bg-slate-300 flex-1 overflow-hidden">
        {url && (
          <audio
            ref={audioRef}
            autoPlay
            src={url}
            onPlay={() => isPlay(true)}
            onPause={() => isPlay(false)}
            onEnded={AudioEnd}
          />
        )}
        <span
          style={{ width: audioContents.progress }}
          className="block absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-md transition-all duration-500 ease-in-out"
        />
      </div>
      <span className="text-sm font-mono">{audioContents.duration}</span>
    </div>
  );
};
