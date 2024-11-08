import { connect, ConnectedProps } from "react-redux";
import { actions } from "@/redux/actions";
import { RootState } from "@/redux/store";

const mapState = (state: RootState) => ({
  is_playing: state.player.is_playing,
  is_playlist_details_pane_open: state.player.playlist_details_pane_is_open,
});

const mapDispatch = (dispatch: any) => ({
  onPlayAlbum: (album_id: string) => {
    dispatch(actions.player.$player_play_album({ album_id }));
  },
  onOpenPlaylist: (playlist_id: string) => {
    dispatch(
      actions.player.player_set_playlist_details_pane({
        playlist_id,
        is_open: true,
      })
    );
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
