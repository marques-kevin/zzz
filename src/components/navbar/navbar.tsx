import React from "react";
import { HouseIcon, SearchIcon, Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { connector, ContainerProps } from "./container/navbar.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
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
        <div
          onClick={props.onClickHome}
          className="flex flex-shrink-0 items-center justify-center gap-2 w-10 h-10 bg-zinc-900 rounded-full"
        >
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

export const Navbar = connector(Wrapper);
