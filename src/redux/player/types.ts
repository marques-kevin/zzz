export const PlayerStateSetPlaying = "PlayerStateSetPlaying";
export interface PlayerStateSetPlayingAction {
  type: typeof PlayerStateSetPlaying;
  payload: {
    is_playing: boolean;
  };
}

export type PlayerActionTypes = PlayerStateSetPlayingAction;
