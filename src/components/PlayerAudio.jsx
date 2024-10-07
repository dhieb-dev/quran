import { useContext, useEffect, useRef, useState } from "react"
import DataContext from "../context/DataContext"
import { controls } from "../svgs/controls"

export function PlayerAudio() {
  const { passUrl, setNextOrPrev } = useContext(DataContext)
  const [isPlayer, setIsPlayer] = useState(false)
  const [upTime, setUpTime] = useState({})
  const audioRef = useRef()
  const progressRef = useRef()

  // Select Time Audio
  useEffect(() => {
    const progress = progressRef.current;
    const audio = audioRef.current
    const selectTime = (e) => {
      if (audio && progress) {
        console.log(progress);
        const clickPositionX = e.offsetX;
        const progressBarWidth = progress.offsetWidth;
        const duration = audio.duration;
        if (duration > 0) {
          const clickPercentage = (clickPositionX / progressBarWidth);
          audio.currentTime = clickPercentage * duration;
        }
      }
    };
    progress.addEventListener('click', selectTime);
    return () => progress.removeEventListener('click', selectTime);
  }, []);

  // Btn Next
  function next() {
    setNextOrPrev(passUrl.nextSibling)
  };

  // Btn Pause Or Play
  function playPause() {
    if (isPlayer) {
      setIsPlayer(false)
      audioRef.current.pause()
    } else {
      setIsPlayer(true)
      audioRef.current.play()
    }
  };

  // Btn Prev
  function prev() {
    setNextOrPrev(passUrl.previousSibling)
  };
  // edit Time & Convert To string
  function editTime(sourceTime) {
    let time = Math.floor(sourceTime);
    let minute = Math.floor(time / 60);
    let second = time % 60;
    return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
  }

  // Time
  function onPlaying() {
    const duration = audioRef.current.duration;
    const ct = audioRef.current.currentTime;
    if (!duration || duration <= 0) {
      return;
    }
    setUpTime({
      progress: `${(ct / duration) * 100}%`,
      ct: editTime(ct),
      duration: editTime(duration)
    });
  }

  const btns = [
    { content: controls.next, click: next },
    { content: isPlayer ? controls.play : controls.pause, click: passUrl ? playPause : null },
    { content: controls.prev, click: prev },
  ]
  // Code Jsx
  return (
    <div dir="ltr" className={`player-audi overflow-hidden shadow-lg fixed bottom-0 left-4 right-4 mb-4 bg-gray-200 dark:bg-black/80 rounded`} >
      <div className="head p-2 flex" >
        <div className="controls flex justify-around items-center w-1/2">
          {btns.map(({ content, click }, index) => <button key={index} className="w-7" onClick={click}>{content}</button>)}
        </div>
        <div dir="rtl" className="info w-full">
          {passUrl && passUrl.children[1].textContent}
        </div>
      </div>
      <div className="px-2 pb-2 text-sm flex items-center space-x-2">
        <div className="current-time" >{upTime.ct}</div>
        <div ref={progressRef} className="progress p-0.5 relative h-2 w-full rounded bg-blue-300 cursor-pointer" >
          {passUrl && <audio ref={audioRef} src={passUrl.dataset.url} autoPlay onPlay={() => setIsPlayer(true)} onPause={() => setIsPlayer(false)} onTimeUpdate={onPlaying} />}
          <div className="block absulote left-0 h-full rounded bg-black dark:bg-white duration-100" style={{ width: upTime.progress }} ></div>
        </div>
        <div className="duration text-right" >{upTime.duration}</div>
      </div>
    </div>
  );
};