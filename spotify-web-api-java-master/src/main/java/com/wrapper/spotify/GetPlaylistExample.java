package com.wrapper.spotify;

import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.Playlist;
import com.wrapper.spotify.requests.data.playlists.GetPlaylistRequest;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class GetPlaylistExample {

  public static String accessToken = "";
  private static final String playlistId = "4JOhIPLnGQVMF55RVLY2kx";

  private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
          .setAccessToken(accessToken)
          .build();
  private static final GetPlaylistRequest getPlaylistRequest = spotifyApi.getPlaylist(playlistId)
          .market(CountryCode.BR)
          .build();

  public static void getPlaylist_Sync() {
    try {
      final Playlist playlist = getPlaylistRequest.execute();

      System.out.println("Name: " + playlist.getName());
    } catch (IOException | SpotifyWebApiException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }

  public static void getPlaylist_Async() {
    try {
      final Future<Playlist> playlistFuture = getPlaylistRequest.executeAsync();

      final Playlist playlist = playlistFuture.get();

      System.out.println("Name: " + playlist.getName());
      System.out.println(playlist.getFollowers().getTotal());
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("Error: " + e.getCause().getMessage());
    }
  }
}