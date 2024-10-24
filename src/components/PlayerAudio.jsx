import { useContext, useEffect, useRef, useState } from "react";
import { MinMax } from "./index";
import DataContext from "../context/DataContext";
import { controls } from "../svgs/controls";

export function PlayerAudio() {
  const { passUrl, setNextOrPrev } = useContext(DataContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioName, setAudioName] = useState("-------");
  const [upTime, setUpTime] = useState({ progress: 0 });
  const [showPlayer, setShowPlayer] = useState(true);
  const audioRef = useRef();
  const progressRef = useRef();

  // Update Name and Time Audio
  useEffect(() => {
    if (passUrl) {
      setAudioName(passUrl.children[1].textContent);
      const audio = audioRef.current;
      const handleTimeUpdate = () => {
        if (audio && audio.duration && !isNaN(audio.duration)) {
          const ct = audio.currentTime;
          setUpTime({
            progress: `${(ct / audio.duration) * 100}%`,
            ct: formatTime(ct),
            duration: formatTime(audio.duration),
          });
        }
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [passUrl]);

  // Select Time Audio
  useEffect(() => {
    const progress = progressRef.current;
    const selectTime = (e) => {
      if (audioRef.current && progress) {
        const clickPositionX = e.offsetX;
        const progressBarWidth = progress.offsetWidth;
        const duration = audioRef.current.duration;
        if (duration > 0) {
          audioRef.current.currentTime = (clickPositionX / progressBarWidth) * duration;
        }
      }
    };
    progress.addEventListener('click', selectTime);
    return () => progress.removeEventListener('click', selectTime);
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

  // Navigation Functions
  const next = () => {
    const nextSibling = passUrl.nextSibling || passUrl.parentElement.firstElementChild;
    setNextOrPrev(nextSibling);
  };

  const prev = () => {
    const prevSibling = passUrl.previousSibling || passUrl.parentElement.lastElementChild;
    setNextOrPrev(prevSibling);
  };

  // Format Time
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(Math.floor(time % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Player Buttons
  const buttons = [
    { content: controls.next, click: next, title: "Next" },
    { content: isPlaying ? controls.pause : controls.play, click: passUrl ? togglePlayPause : null, title: isPlaying ? "Pause" : "Play" },
    { content: controls.prev, click: prev, title: "Previous" },
  ];

  // JSX Code
  return (
    <div dir="ltr" className={`${!showPlayer ? "w-10 bg-transparent" : "px-2 py-1 space-y-2"} duration-500 fixed bottom-0 left-4 right-4 mb-4 bg-gray-100 dark:bg-slate-800 rounded`} >
      <div className="flex justify-between">
        {showPlayer ? (
          <>
            <MinMax signal={showPlayer} onClick={() => setShowPlayer(!showPlayer)} />
            <div className="controls flex justify-around items-center w-1/2">
              {buttons.map(({ content, click, title }, index) => (
                <button key={index} title={title} className="w-7" onClick={click}>{content}</button>
              ))}
            </div>
            <div className="info">{audioName}</div>
          </>
        ) : (
          <div className="absolute bottom-0 flex flex-col items-center">
            <MinMax signal={showPlayer} onClick={() => setShowPlayer(!showPlayer)} />
            <button onClick={togglePlayPause} className="w-10 mt-2">{isPlaying ? controls.pause : controls.play}</button>
          </div>
        )}
      </div>
      <div className={`${showPlayer ? "flex" : "hidden"} text-sm items-center space-x-2`}>
        <div className="current-time">{upTime.ct || "00:00"}</div>
        <div ref={progressRef} title="Progress Audio" className="progress relative h-2 w-full rounded bg-blue-300 cursor-pointer">
          <audio ref={audioRef} src={passUrl.dataset.url} autoPlay type="audio/mpeg" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
          <div className="absolute left-0 h-full rounded bg-black dark:bg-white duration-100" style={{ width: upTime.progress }}></div>
        </div>
        <div className="duration text-right">{upTime.duration || "00:00"}</div>
      </div>
    </div>
  );
}
