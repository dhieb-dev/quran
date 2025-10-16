import { useContext, useEffect, useState } from "react";
import { ControlsPlayer, ProgressPlayer } from "../components/index";
import AudiosContext from "../context/AudiosContext";

export const PlayerAudio = () => {
  const { audioIndex, setAudioIndex, audioList } = useContext(AudiosContext);

  const [isPlay, setIsPlay] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioControls, setAudioControls] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (audioList) setAudioSrc(audioList[audioIndex]);
  }, [audioIndex, audioList]);

  return (
    <>
      {audioSrc && (
        <div>
          {isOpen && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-200/80 dark:bg-zinc-900/90">
              <div className="flex flex-col absolute top-2 right-2 bottom-20 min-w-32 overflow-y-scroll bg-zinc-200 dark:bg-zinc-900">
                {audioList.map((itemList, index) => (
                  <button
                    className="cursor-pointer px-2 py-1 hover:bg-zinc-100 hover:dark:bg-zinc-800"
                    key={index}
                    onClick={() => {
                      setAudioIndex(index);
                      setAudioSrc(audioList[index]);
                    }}
                  >
                    {itemList[0]}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div
            dir="rtl"
            className="progress border-t-2 border-slate-400 dark:border-zinc-700 fixed bottom-0 right-0 left-0 bg-zinc-200 dark:bg-zinc-900 p-2"
          >
            <ControlsPlayer
              audioSrc={audioSrc}
              audio={audio}
              setIsPlay={setIsPlay}
              isPlay={isPlay}
              audioControls={audioControls}
              setAudioControls={setAudioControls}
              setIsOpen={setIsOpen}
              checkUrl={audioList[0][1]}
            />
            <ProgressPlayer
              setAudio={setAudio}
              url={audioSrc[1]}
              isPlay={setIsPlay}
              audioControls={audioControls}
              audioList={audioList}
            />
          </div>{" "}
        </div>
      )}
    </>
  );
};
