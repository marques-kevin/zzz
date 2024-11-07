import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Maximize2,
  Mic2,
  MonitorSpeaker,
  PauseIcon,
  RepeatIcon,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { connector, ContainerProps } from "./container/player-bar.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (props.is_playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [props.is_playing]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className=" p-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 items-center gap-3">
          <img
            alt="Now playing"
            className="rounded"
            height={56}
            src="/covers/derailed-order-day.png"
            width={56}
          />
          <div>
            <div className="">Derailed Order Day</div>
            <div className="text-sm text-zinc-500">Bangblues</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-50 hover:bg-[#1A1A1A]"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className=" hover:bg-[#1A1A1A]">
              <SkipBack className="h-4 w-4 text-zinc-50 fill-zinc-50" />
            </Button>
            <Button
              size="icon"
              className="rounded-full"
              onClick={() => {
                if (props.is_playing) {
                  props.onPause();
                } else {
                  props.onPlay();
                }
              }}
            >
              {props.is_playing ? (
                <PauseIcon className="h-4 w-4 fill-zinc-900" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </Button>
            <Button size="icon" variant="ghost" className=" hover:bg-[#1A1A1A]">
              <SkipForward className="h-4 w-4 text-zinc-50 fill-zinc-50" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-50 hover:bg-[#1A1A1A]"
            >
              <RepeatIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex w-full items-center gap-2">
            <div className="text-xs text-zinc-400">
              {formatTime(currentTime)}
            </div>
            <Slider
              className="[&_[role=slider]]:bg-zinc-50"
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSliderChange}
            />
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-50 hover:bg-[#1A1A1A]"
            >
              <Mic2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-50 hover:bg-[#1A1A1A]"
            >
              <MonitorSpeaker className="h-4 w-4" />
            </Button>

            <Slider
              className="w-[100px] [&_[role=slider]]:bg-zinc-50"
              defaultValue={[100]}
              max={100}
              step={1}
              onValueChange={(value) => {
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-50 hover:bg-[#1A1A1A]"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <audio
        className="hidden"
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => console.log("on next")}
        src="/musics/sword-of-corruption.mp3"
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
};

export const PlayerBar = connector(Wrapper);
