import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { official_playlists } from "@/database/playlists";
import { connector, ContainerProps } from "./container/central-bar.container";
import { PlayIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <>
      <div
        className={clsx(
          "bg-zinc-900 rounded-md h-full overflow-auto transition-all duration-300",
          props.is_playlist_details_pane_open
            ? "opacity-0 scale-95"
            : "opacity-100"
        )}
      >
        <div className="grid gap-6 p-4 py-8">
          <div>
            <h1 className="mb-4 text-2xl pl-1 font-medium">
              Zenless Zone Zero Soundtrack
            </h1>
            <div className="grid grid-cols-5 gap-0">
              {official_playlists.map((_, i) => (
                <div
                  onClick={(e) => {
                    props.onOpenPlaylist(_.album_id);
                  }}
                  className="cursor-pointer group hover:bg-zinc-800 rounded relative"
                >
                  <div className="p-2">
                    <div className="relative">
                      <img
                        alt="Album cover"
                        className="aspect-square w-full rounded object-cover"
                        src={_.album_cover}
                      />

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          props.onPlayAlbum(_.album_id);
                        }}
                        className="absolute hover:scale-110 hover:bg-green-400 group-hover:opacity-100 transform translate-y-0 group-hover:-translate-y-2 opacity-0 transition-all duration-300 shadow-lg bottom-0 right-2 rounded-full bg-green-500 p-3"
                      >
                        <PlayIcon className="h-5 w-5 text-zinc-900" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="font-semibold">{_.album_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {_.artist}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div>
          <h2 className="mb-4 text-2xl pl-1 font-medium">
            Vos titres préférés
          </h2>
          <div className="grid grid-cols-5 gap-0">
            {props.playlist
              .concat(props.playlist)
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
        </div> */}
        </div>
      </div>
    </>
  );
};

export const CentralBar = connector(Wrapper);
