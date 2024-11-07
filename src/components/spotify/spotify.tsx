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

const PlaylistItem: React.FC<{
  title: string;
  artist: string;
  cover: string;
}> = ({ title, artist, cover }) => {
  return (
    <div className="flex items-center cursor-pointer group p-2 px-2 rounded hover:bg-zinc-800">
      <div className="relative">
        <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-zinc-900 bg-opacity-50 flex items-center justify-center">
          <PlayIcon className="h-4 w-4 text-zinc-50" />
        </div>
        <img alt="Track artwork" className="rounded h-12 w-12" src={cover} />
      </div>
      <div className="ml-3">
        <div className="text-zinc-100">{title}</div>
        <div className="text-sm text-zinc-500">{artist}</div>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-2">
      <div className="flex items-center gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/fr/9/92/Zenless_Zone_Zero_logo.png"
          alt="Spotify"
          className="h-10 w-10"
        />
      </div>
      <div className="flex-1 flex items-center gap-2 max-w-xl mx-4">
        <div className="flex flex-shrink-0 items-center justify-center gap-2 w-10 h-10 bg-zinc-900 rounded-full">
          <HouseIcon className="h-5 w-5 text-zinc-500" />
        </div>

        <div className="flex w-full px-4  flex-shrink-0 items-center justify-center gap-2 bg-zinc-900 rounded-full">
          <label
            htmlFor="search"
            className="flex items-center justify-center gap-2"
          >
            <SearchIcon className="h-5 w-5 text-zinc-500" />
          </label>
          <input
            name="search"
            className="w-full bg-transparent outline-none font-light py-3 border-none text-zinc-50 placeholder-zink-500"
            placeholder="Que souhaitez-vous écouter ?"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          className="text-zinc-50 hover:bg-[#1A1A1A]"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <Avatar className="h-8 w-8 bg-zinc-900">
          <AvatarImage src="https://act-webstatic.hoyoverse.com/darkmatter/nap/prod_gf_cn/item_icon_ud9dkb/a40406aafb70e65a0d94b4332044dd0a.png?x-oss-process=image%2Fformat%2Cwebp" />
        </Avatar>
      </div>
    </div>
  );
};

const playlist: {
  title: string;
  artist: string;
  cover: string;
}[] = [
  {
    title: "Eous Anthem",
    artist: "Bangblues",
    cover: "/covers/derailed-order-day.png",
  },
  {
    title: "Casual Savior",
    artist: "Story",
    cover: "/covers/casual-savior.png",
  },
  {
    title: "Daily Loop",
    artist: "Story",
    cover: "/covers/daily-loop.png",
  },
  {
    title: "Shared Earbuds",
    artist: "Story",
    cover: "/covers/shared-earbuds.png",
  },
  {
    title: "Random Play",
    artist: "Story",
    cover: "/covers/random-play.png",
  },
];

const nextTrack = [
  {
    title: "Eous Anthem",
    artist: "Bangblues",
    cover: "/covers/derailed-order-day.png",
  },
  {
    title: "Sword of Corruption",
    artist: "Story",
    cover: "/covers/shared-earbuds.png",
  },
  {
    title: "City of the Dead",
    artist: "City",
    cover: "/covers/daily-loop.png",
  },
];

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

        <ScrollArea className="bg-zinc-900 rounded-md">
          <div className="grid gap-6 p-4 py-8">
            <div>
              <h1 className="mb-4 text-2xl pl-1 font-medium">
                Zenless Zone Zero Soundtrack
              </h1>
              <div className="grid grid-cols-5 gap-0">
                {playlist.map((_, i) => (
                  <div>
                    <div className="p-2">
                      <img
                        alt="Album cover"
                        className="aspect-square rounded object-cover"
                        height={200}
                        src={_.cover}
                        width={200}
                      />
                      <div className="mt-2">
                        <div className="font-semibold">{_.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {_.artist}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl pl-1 font-medium">
                Vos titres préférés
              </h2>
              <div className="grid grid-cols-5 gap-0">
                {playlist
                  .concat(playlist)
                  .sort(() => Math.random() - 0.5)
                  .map((_, i) => (
                    <div>
                      <div className="p-2">
                        <img
                          alt="Album cover"
                          className="aspect-square rounded object-cover"
                          height={200}
                          src={_.cover}
                          width={200}
                        />
                        <div className="mt-2">
                          <div className="font-semibold">{_.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {_.artist}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-[280px] rounded-md overflow-hidden bg-zinc-900 py-4">
          <h2 className="mb-4 font-semibold pl-4">File d'attente</h2>

          <ScrollArea className="h-full overflow-auto">
            <div className="px-2">
              <div className="mt-4 mb-2 pl-2">Titre en cours de lecture</div>
              <div className="grid">
                {Array.from({ length: 1 }).map((_, i) => (
                  <PlaylistItem
                    key={i}
                    title="Derailed Order Day"
                    artist="Bangblues"
                    cover="/covers/derailed-order-day.png"
                  />
                ))}
              </div>

              <div className="mt-8 mb-2 pl-2">A suivre</div>
              <div className="grid pb-8">
                {nextTrack.map((_, i) => (
                  <PlaylistItem
                    key={i}
                    title={_.title}
                    artist={_.artist}
                    cover={_.cover}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <PlayerBar />
    </div>
  );
};
