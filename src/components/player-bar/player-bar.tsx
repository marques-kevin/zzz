import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Maximize2,
  Mic2,
  Minimize2,
  MonitorSpeaker,
  PauseIcon,
  Repeat1Icon,
  RepeatIcon,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
} from "lucide-react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { connector, ContainerProps } from "./container/player-bar.container";
import { useFullscreen } from "@/hooks/use-fullscreen";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [volumeBeforeMuted, setVolumeBeforeMuted] = useState(100);

  useEffect(() => {
    if (audioRef.current) {
      if (props.is_playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [props.is_playing, props.current_track]);

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

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const onVolumeChange = (value: number) => {
    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }

    setVolume(value);

    if (isMuted) {
      setIsMuted(false);
    }

    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const onToggleMute = () => {
    if (isMuted) {
      setVolume(volumeBeforeMuted);
    } else {
      setVolumeBeforeMuted(volume);
      setVolume(0);
    }

    setIsMuted(!isMuted);

    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  };

  const onEnd = () => {
    if (props.replay_mode === "replay_track") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      props.onNext();
    }
  };

  return (
    <div className=" p-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 items-center gap-3">
          <img
            alt="Now playing"
            className="rounded"
            height={56}
            src={props.current_track.album_cover}
            width={56}
          />
          <div>
            <div className="">{props.current_track.title}</div>
            <div className="text-sm text-zinc-500">
              {props.current_track.artist}
            </div>
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
            <Button
              onClick={props.onPrevious}
              size="icon"
              variant="ghost"
              className=" hover:bg-[#1A1A1A]"
            >
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
            <Button
              onClick={props.onNext}
              size="icon"
              variant="ghost"
              className=" hover:bg-[#1A1A1A]"
            >
              <SkipForward className="h-4 w-4 text-zinc-50 fill-zinc-50" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={props.onReplayMode}
              className="text-zinc-50 hover:bg-[#1A1A1A]"
            >
              {props.replay_mode === "replay_playlist" && (
                <RepeatIcon className="h-4 w-4" />
              )}
              {props.replay_mode === "replay_track" && (
                <Repeat1Icon className="h-4 w-4 text-green-400" />
              )}
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
          <div className="flex items-center">
            <div className="px-2 flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={onToggleMute}
                className="text-zinc-50 hover:bg-[#1A1A1A]"
              >
                {isMuted ? (
                  <VolumeXIcon className="h-4 w-4" />
                ) : (
                  <Volume2Icon className="h-4 w-4" />
                )}
              </Button>

              <Slider
                className="w-[100px] [&_[role=slider]]:bg-zinc-50"
                defaultValue={[100]}
                max={100}
                step={1}
                value={[volume]}
                onValueChange={(value) => {
                  onVolumeChange(value[0]);
                }}
              />
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFullscreen}
              className="text-zinc-50 hover:bg-[#1A1A1A]"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <audio
        className="hidden"
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          onEnd();
        }}
        src={props.current_track.source}
        onLoadedMetadata={handleTimeUpdate}
        muted={isMuted}
      />
    </div>
  );
};

export const PlayerBar = connector(Wrapper);
