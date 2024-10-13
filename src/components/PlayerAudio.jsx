import { useContext, useEffect, useRef, useState } from "react"
import DataContext from "../context/DataContext"
import { controls } from "../svgs/controls"

export function PlayerAudio() {
  const { passUrl, setNextOrPrev } = useContext(DataContext)
  const [isPlayer, setIsPlayer] = useState(false)
  const [name, setName] = useState("-------")
  const [upTime, setUpTime] = useState({ progress: 0 })
  const [showPlayer, setShowPlayer] = useState(true)
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

  // Update Name Audio
  useEffect(() => {
    if (passUrl) setName(passUrl.children[1].textContent)
  }, [passUrl])

  // Btn Next
  function next() {
    passUrl.nextSibling === null ? setNextOrPrev(passUrl.parentElement.firstElementChild) : setNextOrPrev(passUrl.nextSibling)
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
    passUrl.previousSibling === null ? setNextOrPrev(passUrl.parentElement.lastElementChild) : setNextOrPrev(passUrl.previousSibling)
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
    const duration = audioRef.current.duration === Infinity ? 0 : audioRef.current.duration;
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
  // Data Btns Player
  const btns = [
    { content: controls.next, click: next, title: "Next" },
    { content: isPlayer ? controls.pause : controls.play, click: passUrl ? playPause : null, title: isPlayer ? "Pause" : "Play" },
    { content: controls.prev, click: prev, title: "Previous" },
  ]
  // Code Jsx
  return (
    <div dir="ltr" className={`${!showPlayer ? "w-10 h-10 rounded-full" : "w-auto"} fixed bottom-0 left-4 right-4 mb-4 bg-gray-100 dark:bg-neutral-800 rounded`} >
      <div className={`${showPlayer ? "w-10 h-10" : "w-7 h-7"} absolute top-0 left-0 rounded-full grid place-items-center`}>
        {!showPlayer && <button onClick={() => setShowPlayer(!showPlayer)} className="absolute -top-5 left-3 w-4 h-4 text-2xl bg-blue-400 cursor-pointer rounded-full"></button>}
        {showPlayer ?
          <button onClick={() => setShowPlayer(!showPlayer)} className="w-4 h-4 text-2xl bg-blue-400 cursor-pointer rounded-full"></button> :
          <button onClick={playPause} className="w-10">{isPlayer ? controls.pause : controls.play}</button>
        }
      </div>
      <div className={`${!showPlayer && "hidden"}`}>
        <div className="head p-2 flex justify-between " >
          <div className="controls flex justify-around items-center w-1/2">
            {btns.map(({ content, click, title }, index) => <button key={index} title={title} className="w-7" onClick={click}>{content}</button>)}
          </div>
          <div className="info">
            {name}
          </div>
        </div>
        <div className="px-2 text-sm flex items-center space-x-2">
          <div className="current-time" >{upTime.ct || "00:00"}</div>
          <div ref={progressRef} title="Progress Audio" className="progress relative h-2 w-full rounded bg-blue-300 cursor-pointer" >
            <audio ref={audioRef} src={passUrl.dataset.url} autoPlay type="audio/mpeg" onPlay={() => setIsPlayer(true)} onPause={() => setIsPlayer(false)} onTimeUpdate={onPlaying} />
            <div className="absulote left-0 h-full rounded bg-black dark:bg-white duration-100" style={{ width: upTime.progress }} ></div>
          </div>
          <div className="duration text-right" >{upTime.duration || "00:00"}</div>
        </div>
      </div>
    </div>
  );
};