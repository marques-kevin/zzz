import { tracks } from "@/database/tracks";
import * as types from "./types";
import { RootState } from "../store";
import { ThunkDispatch } from "redux-thunk";

export const player_set_playing = (
  payload: types.player_set_playing_action["payload"]
): types.PlayerActionTypes => ({
  type: types.player_set_playing,
  payload,
});

export const player_next = (): types.PlayerActionTypes => ({
  type: types.player_next,
});

export const player_previous = (): types.PlayerActionTypes => ({
  type: types.player_previous,
});

export const player_toggle_replay_mode = (): types.PlayerActionTypes => ({
  type: types.player_toggle_replay_mode,
});

export const player_on_end = (): types.PlayerActionTypes => ({
  type: types.player_on_end,
});

export const player_set_tracks = (
  payload: types.player_set_tracks_action["payload"]
): types.PlayerActionTypes => ({
  type: types.player_set_tracks,
  payload,
});

export const player_set_track_time = (
  payload: types.player_set_track_time_action["payload"]
): types.PlayerActionTypes => ({
  type: types.player_set_track_time,
  payload,
});

export const player_set_playing_track = (
  payload: types.player_set_playing_track_action["payload"]
): types.PlayerActionTypes => ({
  type: types.player_set_playing_track,
  payload,
});

export const player_set_playlist_details_pane = (
  payload: types.player_set_playlist_details_pane_action["payload"]
): types.PlayerActionTypes => ({
  type: types.player_set_playlist_details_pane,
  payload,
});

export const player_close_playlist_details_pane =
  (): types.PlayerActionTypes => ({
    type: types.player_close_playlist_details_pane,
  });

export const $player_play_album = (payload: { album_id: string }) => {
  return async (dispatch: any) => {
    const album_tracks = tracks.filter(
      (track) => track.album_id === payload.album_id
    );

    dispatch(player_set_tracks({ tracks: album_tracks }));
    dispatch(player_set_playing_track({ track: album_tracks[0] }));
  };
};

export const $player_set_current_track_from_queue = (payload: {
  title_id: string;
}) => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, types.PlayerActionTypes>,
    getState: () => RootState
  ) => {
    const { player } = getState();

    if (player.tracks_currently_playing.length === 0) return;

    if (payload.title_id === player.current_track.title_id)
      return dispatch(player_set_playing({}));

    const track_index = player.tracks_currently_playing.findIndex(
      (track) => track.title_id === payload.title_id
    );

    if (track_index !== -1) {
      const track = player.tracks_currently_playing[track_index];

      dispatch(player_set_playing_track({ track }));
    }
  };
};
