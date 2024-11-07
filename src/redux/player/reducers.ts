import { musics } from "@/database/musics";
import * as types from "./types";

interface State {
  is_playing: boolean;
  current_track: {
    title: string;
    artist: string;
    cover: string;
    source: string;
  };
}

const initialState: State = {
  is_playing: false,
  current_track: musics[0],
};

export function playerReducer(
  state = initialState,
  action: types.PlayerActionTypes
): State {
  if (action.type === types.PlayerStateSetPlaying) {
    return {
      ...state,
      is_playing: action.payload.is_playing,
    };
  }

  return state;
}
