import { useContext, useEffect, useRef, useState } from "react";
import { ProgressAudio } from "../components";
import Context from "../context/Context";

export const PlayerAudio = () => {
  const { audioIndex, setAudioIndex, audioList } = useContext(Context);
  const [audioContents, setAudioContents] = useState({
    duration: "00:00",
    currentTime: "00:00",
    progress: "0%",
  });
  const [isPlay, setIsPlay] = useState(false);
  const [audioSrc, setAudioSrc] = useState(false);
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
  }, [audioList, audioIndex]);

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

  // Click Btns Play Or Pause
  const playOrPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      setIsPlay(true);
      audio.play();
    } else {
      setIsPlay(false);
      audio.pause();
    }
  };
  return (
    <>
      {audioSrc && (
        <div
          dir="rtl"
          className="fixed bottom-0 right-0 left-0 bg-zinc-200 dark:bg-zinc-900 p-2"
        >
          <div className="controls flex justify-around items-center mb-2">
            {audioSrc && <p>{audioSrc[0]}</p>}
            <button
              onClick={() => setAudioIndex((prev) => prev - 1)}
              className="next w-5 h-5"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496.158 496.158"
              >
                <path
                  className="fill-gray-900 dark:fill-slate-100"
                  d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.002,0,111.062,0,248.085 c0,137.002,111.07,248.071,248.083,248.071C385.088,496.155,496.158,385.086,496.158,248.085z"
                />
                <g>
                  <path
                    className="fill-white dark:fill-gray-800"
                    d="M288.037,236.937l-149.525-91.812c-4.082-2.506-9.453-2.615-13.632-0.275 c-4.255,2.379-6.897,6.887-6.897,11.762v182.901c0,4.867,2.634,9.369,6.877,11.754c2.011,1.129,4.294,1.727,6.603,1.727 c2.475,0,4.899-0.682,7.011-1.969l149.523-91.088c3.98-2.424,6.459-6.826,6.467-11.489 C294.47,243.787,292.008,239.375,288.037,236.937z"
                  />
                  <path
                    className="fill-white dark:fill-gray-800"
                    d="M369.593,139.057h-51.507c-4.741,0-8.584,3.844-8.584,8.584v200.877c0,4.74,3.843,8.584,8.584,8.584 h51.507c4.74,0,8.583-3.844,8.583-8.584V147.64C378.176,142.9,374.333,139.057,369.593,139.057z"
                  />
                </g>
              </svg>
            </button>
            <button onClick={playOrPause} className="play-pause w-6 h-6">
              {isPlay ? (
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496.158 496.158"
                >
                  <path
                    className="fill-[#E5AA17]"
                    d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.002,0,111.062,0,248.085 c0,137.002,111.07,248.071,248.083,248.071C385.088,496.155,496.158,385.086,496.158,248.085z"
                  />
                  <g>
                    <path
                      className="fill-[#FFFFFF]"
                      d="M223.082,121.066h-60.006c-5.523,0-10,4.479-10,10v234.024c0,5.523,4.477,10,10,10h60.006 c5.523,0,10-4.477,10-10V131.066C233.082,125.545,228.605,121.066,223.082,121.066z"
                    />
                    <path
                      className="fill-[#FFFFFF]"
                      d="M333.082,121.066h-60.006c-5.523,0-10,4.479-10,10v234.024c0,5.523,4.477,10,10,10h60.006 c5.523,0,10-4.477,10-10V131.066C343.082,125.545,338.605,121.066,333.082,121.066z"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496.158 496.158"
                >
                  <path
                    className="fill-gray-900 dark:fill-slate-100"
                    d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.002,0,111.062,0,248.085 c0,137.002,111.07,248.071,248.083,248.071C385.088,496.155,496.158,385.086,496.158,248.085z"
                  />
                  <path
                    className="fill-white dark:fill-gray-800"
                    d="M370.805,235.242L195.856,127.818c-4.776-2.934-11.061-3.061-15.951-0.322 c-4.979,2.785-8.071,8.059-8.071,13.762v214c0,5.693,3.083,10.963,8.046,13.752c2.353,1.32,5.024,2.02,7.725,2.02 c2.897,0,5.734-0.797,8.205-2.303l174.947-106.576c4.657-2.836,7.556-7.986,7.565-13.44 C378.332,243.258,375.452,238.096,370.805,235.242z"
                  />
                </svg>
              )}
            </button>
            <button
              className="prev w-5 h-5"
              onClick={() => setAudioIndex((prev) => prev + 1)}
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496.158 496.158"
              >
                <path
                  className="fill-gray-900 dark:fill-slate-100"
                  d="M0,248.085C0,111.063,111.07,0.002,248.076,0.002c137.012,0,248.082,111.061,248.082,248.082 c0,137.002-111.07,248.071-248.082,248.071C111.07,496.155,0,385.086,0,248.085z"
                />
                <g>
                  <path
                    className="fill-white dark:fill-gray-800"
                    d="M208.121,236.937l149.525-91.812c4.082-2.506,9.453-2.615,13.633-0.275 c4.254,2.379,6.896,6.887,6.896,11.762v182.901c0,4.867-2.633,9.369-6.877,11.754c-2.01,1.129-4.293,1.727-6.602,1.727 c-2.475,0-4.9-0.682-7.012-1.969l-149.523-91.088c-3.98-2.424-6.459-6.826-6.467-11.489 C201.687,243.787,204.15,239.375,208.121,236.937z"
                  />
                  <path
                    className="fill-white dark:fill-gray-800"
                    d="M126.564,139.057h51.508c4.74,0,8.584,3.844,8.584,8.584v200.877c0,4.74-3.844,8.584-8.584,8.584 h-51.508c-4.74,0-8.582-3.844-8.582-8.584V147.64C117.982,142.9,121.824,139.057,126.564,139.057z"
                  />
                </g>
              </svg>
            </button>
            <button
              onClick={() =>
                audioControls === null
                  ? setAudioControls("regular")
                  : audioControls === "regular"
                  ? setAudioControls("random")
                  : setAudioControls(null)
              }
              className={`w-6 h-6 ${audioControls === null && "opacity-20"}`}
            >
              {audioControls === "random" ? (
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496.158 496.158"
                >
                  <path
                    className="fill-gray-900 dark:fill-slate-100"
                    d="M496.158,248.085c0-137.021-111.07-248.082-248.077-248.082C111.07,0.003,0,111.063,0,248.085 c0,137.002,111.07,248.07,248.081,248.07C385.088,496.155,496.158,385.087,496.158,248.085z"
                  />
                  <g>
                    <path
                      className="fill-white dark:fill-gray-800"
                      d="M432.878,241.493l-117.8-76.494c-2.351-1.527-5.351-1.645-7.815-0.308 c-2.465,1.339-3.998,3.919-3.998,6.724v45.432c-32.018-0.647-80.905,9.505-100.451,51.855c-2.758,5.975-5.141,11.736-7.443,17.309 c-13.223,31.992-18.698,45.234-64.982,45.234c-16.898,0-30.597,13.699-30.597,30.598s13.698,30.598,30.597,30.598 c87.207,0,107.051-48.002,121.537-83.053c2.166-5.24,4.213-10.191,6.451-15.043c6.607-14.312,32.938-16.424,44.889-16.207v50.854 c0,2.842,1.574,5.449,4.09,6.771c1.117,0.586,2.34,0.879,3.559,0.879c1.521,0,3.039-0.455,4.338-1.35l117.8-81.084 c2.104-1.447,3.347-3.85,3.312-6.402C436.329,245.252,435.022,242.884,432.878,241.493z"
                    />
                    <path
                      className="fill-white dark:fill-gray-800"
                      d="M266.222,210.218c-3.45-2.18-6.238-4.925-7.846-8.406c-2.238-4.85-4.285-9.801-6.451-15.042 c-14.486-35.051-34.33-83.052-121.537-83.052c-16.898,0-30.597,13.699-30.597,30.598s13.698,30.598,30.597,30.598 c46.284,0,51.76,13.241,64.982,45.232c2.303,5.572,4.686,11.335,7.443,17.311c2.037,4.414,4.405,8.462,7.03,12.197 C225.003,222.913,246.09,214.164,266.222,210.218z"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496.166 496.166"
                >
                  <path
                    className="fill-gray-900 dark:fill-slate-100"
                    d="M0.005,248.087C0.005,111.063,111.073,0,248.079,0c137.014,0,248.082,111.062,248.082,248.087 c0,137.002-111.068,248.079-248.082,248.079C111.073,496.166,0.005,385.089,0.005,248.087z"
                  />
                  <path
                    className="fill-white dark:fill-gray-800"
                    d="M400.813,169.581c-2.502-4.865-14.695-16.012-35.262-5.891 c-20.564,10.122-10.625,32.351-10.625,32.351c7.666,15.722,11.98,33.371,11.98,52.046c0,65.622-53.201,118.824-118.828,118.824 c-65.619,0-118.82-53.202-118.82-118.824c0-61.422,46.6-111.946,106.357-118.173v30.793c0,0-0.084,1.836,1.828,2.999 c1.906,1.163,3.818,0,3.818,0l98.576-58.083c0,0,2.211-1.162,2.211-3.436c0-1.873-2.211-3.205-2.211-3.205l-98.248-57.754 c0,0-2.24-1.605-4.23-0.826c-1.988,0.773-1.744,3.481-1.744,3.481v32.993c-88.998,6.392-159.23,80.563-159.23,171.21 c0,94.824,76.873,171.696,171.693,171.696c94.828,0,171.707-76.872,171.707-171.696 C419.786,219.788,412.933,193.106,400.813,169.581z"
                  />
                </svg>
              )}
            </button>
          </div>
          <ProgressAudio
            ref={audioRef}
            url={audioSrc[1]}
            duration={audioContents?.duration}
            currentTime={audioContents?.currentTime}
            progress={audioContents?.progress}
            isPlay={setIsPlay}
            audioControls={audioControls}
            setAudioIndex={setAudioIndex}
            audioList={audioList}
          />
        </div>
      )}
    </>
  );
};
