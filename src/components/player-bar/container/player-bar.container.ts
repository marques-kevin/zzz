import { connect, ConnectedProps } from "react-redux";
import { actions } from "@/redux/actions";
import { RootState } from "@/redux/store";

const mapState = (state: RootState) => ({
  is_playing: state.player.is_playing,
  current_track: state.player.current_track,
  replay_mode: state.player.replay_mode,
});

const mapDispatch = (dispatch: any) => ({
  onPlay: () => {
    dispatch(actions.player.player_set_playing({ is_playing: true }));
  },
  onPause: () => {
    dispatch(actions.player.player_set_playing({ is_playing: false }));
  },
  onNext: () => {
    dispatch(actions.player.player_next());
  },
  onPrevious: () => {
    dispatch(actions.player.player_previous());
  },
  onReplayMode: () => {
    dispatch(actions.player.player_toggle_replay_mode());
  },
  onTimeUpdate: (e: any) => {
    dispatch(
      actions.player.player_set_track_time({ track_time: e.target.currentTime })
    );
  },

  onEnd: () => {
    dispatch(actions.player.player_on_end());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
