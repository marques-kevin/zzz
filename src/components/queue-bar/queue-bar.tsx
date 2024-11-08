import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Track } from "@/types/track.type";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { connector, ContainerProps } from "./container/queue-bar.container";
import clsx from "clsx";

const PlaylistItem: React.FC<
  Track & {
    onClick: () => void;
    current_track?: boolean;
    is_selected?: boolean;
    is_playing?: boolean;
  }
> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className="flex items-center cursor-pointer group p-2 px-2 rounded hover:bg-zinc-800"
    >
      <div className="relative flex-shrink-0">
        <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-zinc-900 bg-opacity-50 flex items-center justify-center">
          {props.is_playing && props.is_selected ? (
            <PauseIcon className="h-5 w-5 text-zinc-50" />
          ) : (
            <PlayIcon className="h-5 w-5 text-zinc-50" />
          )}
        </div>
        <img
          alt="Track artwork"
          className="rounded h-12 w-12"
          src={props.album_cover}
        />
        {props.is_playing && props.is_selected && <PlayingSmallItems />}
      </div>
      <div className="ml-3 ">
        <div
          className={clsx(
            "overflow-ellipsis",
            props.is_selected && "text-green-400",
            !props.is_selected && "text-zinc-100"
          )}
        >
          {props.title}
        </div>
        <div className="text-sm text-zinc-500">{props.album_name}</div>
      </div>
    </div>
  );
};

const PlayingSmallItems: React.FC = (props) => {
  return (
    <div className="flex playing-animation  items-end gap-0.5 absolute bottom-1 right-1">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export const Wrapper: React.FC<ContainerProps> = (props) => {
  if (props.tracks_currently_playing.length === 0) return null;

  return (
    <div className="w-[280px] rounded-md overflow-hidden bg-zinc-900 py-8">
      <h2 className="mb-4 font-semibold pl-4 text-zinc-400">File d'attente</h2>

      <ScrollArea className="h-full overflow-auto">
        <div className="px-2">
          <div className="grid pb-8">
            {props.tracks_currently_playing.map((track, i) => (
              <PlaylistItem
                key={i}
                {...track}
                is_selected={track.title_id === props.current_track.title_id}
                is_playing={props.is_playing}
                onClick={() => props.onPlayTrack(track.title_id)}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export const QueueBar = connector(Wrapper);
