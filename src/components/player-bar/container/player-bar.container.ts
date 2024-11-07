import { connect, ConnectedProps } from "react-redux";
import { actions } from "@/redux/actions";
import { RootState } from "@/redux/store";

const mapState = (state: RootState) => ({
  is_playing: state.player.is_playing,
});

const mapDispatch = (dispatch: any) => ({
  onPlay: () => {
    dispatch(actions.player.PlayerStateSetPlaying({ is_playing: true }));
  },
  onPause: () => {
    dispatch(actions.player.PlayerStateSetPlaying({ is_playing: false }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
