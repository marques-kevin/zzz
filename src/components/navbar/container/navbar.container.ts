import { connect, ConnectedProps } from "react-redux";
import { actions } from "@/redux/actions";
import { RootState } from "@/redux/store";

const mapState = (state: RootState) => ({
  is_playing: state.player.is_playing,
  current_track: state.player.current_track,
  replay_mode: state.player.replay_mode,
});

const mapDispatch = (dispatch: any) => ({
  onClickHome: () => {
    dispatch(actions.player.player_close_playlist_details_pane());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
