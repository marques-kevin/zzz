import { tracks } from "@/database/tracks";
import { ScrollArea } from "../ui/scroll-area";
import { PlayIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  connector,
  ContainerProps,
} from "./container/playlist-details-pane.container";
import clsx from "clsx";
import { ArrowDown, ChevronDown } from "lucide-react";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const tracks_in_album = tracks.filter(
    (t) => t.album_id === props.playlist_id
  );

  return (
    <div
      className={clsx(
        "rounded-md bg-zinc-900 overflow-auto transition-all duration-300 absolute inset-0",
        props.is_open ? "translate-y-0" : "translate-y-full"
      )}
    >
      <button
        onClick={() => props.onClose()}
        className="absolute top-4 right-4"
      >
        <div className="flex items-center justify-end p-2 hover:bg-zinc-700 rounded-full">
          <ChevronDown className="h-5 w-5 text-zinc-400" />
        </div>
      </button>
      <div className="flex items-center gap-4 bg-zinc-800 p-4">
        <img
          alt="Album cover"
          className="aspect-square w-[200px] rounded object-cover"
          src={props.playlist_cover}
        />
        <div className="flex flex-col">
          <p className="text-sm  text-zinc-400">Playlist</p>
          <p className="font-bold my-2 text-4xl">{props.playlist_title}</p>
          <p className="text-sm text-zinc-400">{props.playlist_artist}</p>
          <div className="flex mt-4 items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/fr/9/92/Zenless_Zone_Zero_logo.png"
                alt="Zenless Zone Zero Logo"
                className="h-6 w-6"
              />
              <span>Zenless Zone Zero</span>
            </div>
            <span>•</span>
            <span>
              {tracks_in_album.length} titres, environ{" "}
              {Math.floor(tracks_in_album.length * 3)} minutes
            </span>
          </div>
        </div>
      </div>

      <div className="pl-8 mt-6">
        <button
          onClick={() => props.onPlayAlbum(props.playlist_id as string)}
          className="p-4 hover:bg-green-400 rounded-full hover:scale-110 transition-all duration-300 bg-green-500"
        >
          <PlayIcon className="h-5 w-5 text-zinc-900" />
        </button>
      </div>

      <div className="grid gap-6 px-6 mt-6 overflow-auto">
        <div className="w-full">
          <div className="border-b border-zinc-800 text-zinc-400 flex items-center">
            <div className="w-10 text-left p-4">#</div>
            <div className="text-left  p-4">Titre</div>
            <div className="ml-auto p-4">Durée</div>
          </div>
          <div>
            {tracks_in_album.map((_, i) => (
              <div
                onClick={() => props.onPlay({ title_id: _.title_id })}
                className="cursor-pointer py-2 flex items-center w-full border-transparent group hover:bg-zinc-800 border rounded relative"
              >
                <div className="px-4 w-10">{i + 1}</div>
                <div className="px-4">
                  <div className="">{_.title}</div>
                  <div className="text-zinc-400">{_.artist}</div>
                </div>
                <div className="ml-auto px-4">2:50</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PlaylistDetailsPane = connector(Wrapper);
