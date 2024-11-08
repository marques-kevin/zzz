import { tracks } from "@/database/tracks";
import * as types from "./types";
import { ReplayMode, Track } from "@/types/track.type";

interface State {
  is_playing: boolean;
  current_track: Track;
  volume: number;
  is_muted: boolean;
  volume_before_muted: number;
  tracks_currently_playing: Track[];
  replay_mode: ReplayMode;
  track_time: number;
  playlist_details_pane_is_open: boolean;
  playlist_details_pane_playlist_id: string | null;
}

const initialState: State = {
  is_playing: false,
  current_track: tracks[0],
  tracks_currently_playing: [],
  volume: 100,
  is_muted: false,
  volume_before_muted: 100,
  replay_mode: "replay_playlist",
  track_time: 0,
  playlist_details_pane_is_open: false,
  playlist_details_pane_playlist_id: null,
};

export function playerReducer(
  state = initialState,
  action: types.PlayerActionTypes
): State {
  if (action.type === types.player_set_playing) {
    if (action.payload?.is_playing !== undefined) {
      return {
        ...state,
        is_playing: action.payload.is_playing,
      };
    }

    return {
      ...state,
      is_playing: !state.is_playing,
    };
  }

  if (action.type === types.player_set_playlist_details_pane) {
    return {
      ...state,
      playlist_details_pane_is_open: action.payload.is_open,
      playlist_details_pane_playlist_id: action.payload.playlist_id,
    };
  }

  if (action.type === types.player_close_playlist_details_pane) {
    return {
      ...state,
      playlist_details_pane_is_open: false,
    };
  }

  if (action.type === types.player_set_track_time) {
    return {
      ...state,
      track_time: action.payload.track_time,
    };
  }

  if (action.type === types.player_toggle_replay_mode) {
    if (state.replay_mode === "replay_playlist") {
      return {
        ...state,
        replay_mode: "replay_track",
      };
    }

    return {
      ...state,
      replay_mode: "replay_playlist",
    };
  }

  if (action.type === types.player_on_end) {
    if (state.replay_mode === "replay_track") {
      return {
        ...state,
        track_time: 0,
      };
    }

    return {
      ...state,
    };
  }

  if (action.type === types.player_set_tracks) {
    return {
      ...state,
      tracks_currently_playing: action.payload.tracks,
    };
  }

  if (action.type === types.player_next) {
    const findIndex = state.tracks_currently_playing.findIndex(
      (track) => track.title_id === state.current_track.title_id
    );

    if (
      findIndex === state.tracks_currently_playing.length - 1 ||
      findIndex === -1
    ) {
      return state;
    }

    return {
      ...state,
      current_track: state.tracks_currently_playing[findIndex + 1],
    };
  }

  if (action.type === types.player_previous) {
    const findIndex = state.tracks_currently_playing.findIndex(
      (track) => track.title_id === state.current_track.title_id
    );

    console.log(findIndex);

    if (findIndex === -1 || findIndex === 0) {
      return state;
    }

    return {
      ...state,
      current_track: state.tracks_currently_playing[findIndex - 1],
    };
  }

  if (action.type === types.player_set_playing_track) {
    return {
      ...state,
      is_playing: true,
      current_track: action.payload.track,
    };
  }

  return state;
}
