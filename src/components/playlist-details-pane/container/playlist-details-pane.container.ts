import { connect, ConnectedProps } from "react-redux";
import { actions } from "@/redux/actions";
import { RootState } from "@/redux/store";
import { official_playlists } from "@/database/playlists";

const mapState = (state: RootState) => {
  const playlist = official_playlists.find(
    (p) => p.album_id === state.player.playlist_details_pane_playlist_id
  );

  return {
    is_playing: state.player.is_playing,
    is_open: state.player.playlist_details_pane_is_open,
    playlist_id: state.player.playlist_details_pane_playlist_id,
    playlist_cover: playlist?.album_cover,
    playlist_title: playlist?.title,
    playlist_artist: playlist?.artist,
  };
};

const mapDispatch = (dispatch: any) => ({
  onPlay: (params: { title_id: string }) => {
    dispatch(actions.player.$player_set_current_track_from_queue(params));
  },
  onPlayAlbum: (album_id: string) => {
    dispatch(actions.player.$player_play_album({ album_id }));
  },
  onClose: () => {
    dispatch(actions.player.player_close_playlist_details_pane());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
