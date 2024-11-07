import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Player from "../components/player/player";
import { MusicVisualizer } from "@/components/player/music-visualiser";
import { WaveVisualizer } from "@/components/player/wave";
import { Spotify } from "@/components/spotify/spotify";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Spotify />
    // <main className="flex flex-col items-center justify-center h-screen bg-zinc-800">
    //   <Player />
    //   {/* <MusicVisualizer audioSrc="/musics/derailed-order-day.mp3" /> */}
    // </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Home Page</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
  </>
);
