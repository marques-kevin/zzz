import * as types from "./types";

export const PlayerStateSetPlaying = (
  payload: types.PlayerStateSetPlayingAction["payload"]
): types.PlayerActionTypes => ({
  type: types.PlayerStateSetPlaying,
  payload,
});
