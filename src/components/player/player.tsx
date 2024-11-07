import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from "lucide-react";
import WaveVisualizer from "./wave";

interface Track {
  title: string;
  duration: string;
  src: string;
}

export default function Component() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks: Track[] = [
    {
      title: "Derailed Order Day",
      duration: "4:25",
      src: "/musics/derailed-order-day.mp3",
    },
    {
      title: "Sword of Corruption",
      duration: "4:25",
      src: "/musics/sword-of-corruption.mp3",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : tracks.length - 1
    );
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex < tracks.length - 1 ? prevIndex + 1 : 0
    );
  };

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
    <Card className="w-full max-w-2xl bg-zinc-900 text-white border-none">
      <CardContent className="p-6">
        <div className="grid grid-cols-[300px,1fr] gap-6">
          <div className="bg-yellow-400 rounded-lg p-4 relative">
            <img
              src="/placeholder.svg?height=300&width=300"
              alt="Album art for Casual Savior Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white text-xs py-1 px-2 rounded">
              CASUAL SAVIOR STORY
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex-1 space-y-2">
              {tracks.map((track, index) => (
                <Button
                  key={track.title}
                  variant="ghost"
                  className={`w-full justify-start rounded-full h-12 ${
                    currentTrackIndex === index
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                  onClick={() => setCurrentTrackIndex(index)}
                >
                  <span className="truncate">
                    {track.title}
                    {currentTrackIndex === index && (
                      <span className="ml-2 text-emerald-400">▐ ▐</span>
                    )}
                  </span>
                </Button>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                onValueChange={handleSliderChange}
              />
              <div className="flex items-center justify-between">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-zinc-800"
                >
                  <Shuffle className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-12 w-12 hover:bg-zinc-800"
                    onClick={handlePrevious}
                  >
                    <SkipBack className="h-6 w-6" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-14 w-14 hover:bg-zinc-800"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 fill-current" />
                    ) : (
                      <Play className="h-8 w-8 fill-current" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-12 w-12 hover:bg-zinc-800"
                    onClick={handleNext}
                  >
                    <SkipForward className="h-6 w-6" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-zinc-800"
                >
                  <Repeat className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        onLoadedMetadata={handleTimeUpdate}
      />
      {audioRef.current && isPlaying && <WaveVisualizer audioRef={audioRef} />}
    </Card>
  );
}
