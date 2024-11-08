import { Track } from "@/types/track.type";
import { tracks } from "./tracks";
import { uniqBy } from "lodash";

export const official_playlists: Track[] = uniqBy(
  tracks,
  (track) => track.album_id
);
