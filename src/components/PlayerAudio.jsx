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
        const clickPositionX = e.offsetX;
        const progressBarWidth = progress.offsetWidth;
        const duration = audio.duration;
        if (duration > 0) {
          const clickPercentage = (clickPositionX / progressBarWidth);
          audio.currentTime = clickPercentage * duration;
        }
      }
    };
    if (progress) progress.addEventListener('click', selectTime);
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
    let munite = Math.floor(time / 60);
    let secound = time % 60
    return `${String(munite).padStart("2", 0)}:${String(secound).padStart("2", 0)}`;
  }
  // Time
  function onPlaying() {
    const duration = Math.floor(audioRef.current.duration);
    let ct = Math.floor(audioRef.current.currentTime);
    const progress = (ct / duration) * 100 + "%"
    setUpTime({ progress, ct: editTime(ct), duration: editTime(duration) })
  }
  const btns = [
    { content: controls.next, click: next },
    { content: isPlayer ? controls.play : controls.pause, click: passUrl ? playPause : null },
    { content: controls.prev, click: prev },
  ]
  // Code Jsx
  return (
    <>
      {passUrl &&
        <div dir="ltr" className={`player-audi overflow-hidden shadow-lg fixed bottom-0 left-4 right-4 mb-4 bg-gray-200 dark:bg-black/80 rounded`} >
          <div className="head p-2 flex" >
            <div className="controls flex justify-around items-center w-1/2">
              {btns.map(({ content, click }, index) => <button key={index} className="w-7" onClick={click}>{content}</button>)}
            </div>
            <div dir="rtl" className="info w-full">
              {passUrl.textContent}
            </div>
          </div>
          <div className="px-2 pb-2 text-sm flex items-center space-x-2">
            <div className="current-time" >{upTime.ct || "00:00"}</div>
            <div ref={progressRef} className="progress p-0.5 relative h-2 w-full rounded bg-blue-300 cursor-pointer" >
              <audio ref={audioRef} src={passUrl.dataset.url} autoPlay onPlay={() => setIsPlayer(true)} onPause={() => setIsPlayer(false)} onTimeUpdate={onPlaying} />
              <div className="block absulote left-0 h-full rounded bg-black dark:bg-white duration-200" style={{ width: upTime.progress }} ></div>
            </div>
            <div className="duration text-right" >{upTime.duration || "00:00"}</div>
          </div>
        </div>}
    </>
  );
};