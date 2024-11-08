import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  Bell,
  Download,
  Forward,
  Home,
  HouseIcon,
  LibraryIcon,
  Maximize2,
  Mic2,
  MonitorSpeaker,
  MoreHorizontal,
  PauseIcon,
  Play,
  Plus,
  RepeatIcon,
  Rewind,
  Search,
  SearchIcon,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { ArrowPathIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Link } from "gatsby";
import { PlayerBar } from "../player-bar/player-bar";
import { QueueBar } from "../queue-bar/queue-bar";
import { CentralBar } from "../central-bar/central-bar";
import { PlaylistDetailsPane } from "../playlist-details-pane/playlist-details-pane";
import { Navbar } from "../navbar/navbar";

const Library = () => {
  return (
    <div className="flex w-[280px] flex-col gap-2 text-zinc-400">
      <div className="flex flex-1 flex-col rounded-md bg-zinc-900">
        <div className="flex items-center gap-2 mt-8 px-4">
          <LibraryIcon className="h-6 w-6" />
          <span className="font-semibold text-zinc-400">Bibliothèque</span>
          <div className="ml-auto size-8 flex items-center justify-center rounded-full text-zinc-50 hover:bg-zinc-800">
            <Plus className="h-4 w-4" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="grid gap-2 p-4">
            <Link className="flex items-center gap-3" to="#">
              <Avatar className="h-12 w-12 rounded">
                <AvatarImage
                  alt="Playlist"
                  src="https://act-webstatic.hoyoverse.com/darkmatter/nap/prod_gf_cn/item_icon_ud9dkb/a40406aafb70e65a0d94b4332044dd0a.png?x-oss-process=image%2Fformat%2Cwebp"
                />
              </Avatar>
              <div className="grid gap-1">
                <div className="text-zinc-100">Chill</div>
                <div className="text-sm text-zinc-400">Playlist • Yanagi</div>
              </div>
            </Link>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export const Spotify: React.FC = () => {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto] dark bg-zinc-950 text-zinc-50">
      <Navbar />

      <div className="grid grid-cols-[auto,1fr,auto] gap-2 overflow-hidden px-2">
        <Library />
        <div className="relative h-full">
          <CentralBar />
          <PlaylistDetailsPane />
        </div>
        <QueueBar />
      </div>

      <PlayerBar />
    </div>
  );
};
