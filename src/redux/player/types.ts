import { ReplayMode, Track } from "@/types/track.type";

export const player_set_playing = "player_set_playing";
export interface player_set_playing_action {
  type: typeof player_set_playing;
  payload?: {
    is_playing?: boolean;
  };
}

export const player_set_tracks = "player_set_tracks";
export interface player_set_tracks_action {
  type: typeof player_set_tracks;
  payload: {
    tracks: Track[];
  };
}

export const player_set_track_time = "player_set_track_time";
export interface player_set_track_time_action {
  type: typeof player_set_track_time;
  payload: {
    track_time: number;
  };
}

export const player_set_playlist_details_pane =
  "player_set_playlist_details_pane";
export interface player_set_playlist_details_pane_action {
  type: typeof player_set_playlist_details_pane;
  payload: {
    is_open: boolean;
    playlist_id: string;
  };
}

export const player_close_playlist_details_pane =
  "player_close_playlist_details_pane";
export interface player_close_playlist_details_pane_action {
  type: typeof player_close_playlist_details_pane;
}

export const player_toggle_replay_mode = "player_toggle_replay_mode";
export interface player_toggle_replay_mode_action {
  type: typeof player_toggle_replay_mode;
  payload?: {};
}

export const player_next = "player_next";
export interface player_next_action {
  type: typeof player_next;
}

export const player_previous = "player_previous";
export interface player_previous_action {
  type: typeof player_previous;
}

export const player_on_end = "player_on_end";
export interface player_on_end_action {
  type: typeof player_on_end;
}

export const player_set_playing_track = "player_set_playing_track";
export interface player_set_playing_track_action {
  type: typeof player_set_playing_track;
  payload: {
    track: Track;
  };
}

export type PlayerActionTypes =
  | player_set_playing_action
  | player_set_tracks_action
  | player_set_playing_track_action
  | player_next_action
  | player_set_track_time_action
  | player_on_end_action
  | player_set_playlist_details_pane_action
  | player_close_playlist_details_pane_action
  | player_toggle_replay_mode_action
  | player_previous_action;
