export type Track = {
  title: string;
  title_id: string;
  artist: string;
  artist_id: string;
  source: string;
  album_cover: string;
  album_id: string;
  album_name: string;
};

export type ReplayMode = "replay_playlist" | "replay_track";
