package com.wrapper.spotify;

import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.Album;
import com.wrapper.spotify.model_objects.specification.ArtistSimplified;
import com.wrapper.spotify.model_objects.specification.Playlist;
import com.wrapper.spotify.model_objects.specification.PlaylistTrack;
import com.wrapper.spotify.model_objects.specification.Track;
import com.wrapper.spotify.requests.data.playlists.GetPlaylistRequest;
import com.wrapper.spotify.requests.data.playlists.GetPlaylistsTracksRequest;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.requests.data.albums.GetAlbumRequest;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class GetTracksPlaylist {
  public static String accessToken = "";
  public /*static*/ String playlistId =  GetListOfUserPlaylist.idPlaylistGlobal;
  public static String infoTrack = "";
  public static String trackId = "";
  public static String albumId = "";

  private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
          .setAccessToken(accessToken)
          .build();
  
  private /*static*/ final GetPlaylistRequest getPlaylistRequest = spotifyApi.getPlaylist(playlistId)
          .market(CountryCode.BR)
          .build();
  
  private /*static*/ final GetPlaylistsTracksRequest getPlaylistTracksRequest = spotifyApi.getPlaylistsTracks(playlistId)
          //.fields("description")
          .limit(100)
          .offset(0)
          .market(CountryCode.BR)
          .build();
  
  public /*static*/ void getPlaylistsTracks_Sync() {
    try {
      final Playlist playlist = getPlaylistRequest.execute();
      final Paging<PlaylistTrack> playlistTrackPaging = getPlaylistTracksRequest.execute();

      System.out.println("Name: " + playlist.getName());
      System.out.println("Total: " + playlistTrackPaging.getTotal());
    } catch (IOException | SpotifyWebApiException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }

  public /*static*/ void getPlaylistsTracks_Async() {
      
    String infoTrackAux = "";
    
    try {
      final Future<Playlist> playlistFuture = getPlaylistRequest.executeAsync();
      final Future<Paging<PlaylistTrack>> pagingFuture = getPlaylistTracksRequest.executeAsync();

      final Playlist playlist = playlistFuture.get();
      final Paging<PlaylistTrack> playlistTrackPaging = pagingFuture.get();

      System.out.println("Name: " + playlist.getName());
      System.out.println("Total: " + playlistTrackPaging.getTotal());

      PlaylistTrack[] tracks = playlistTrackPaging.getItems();
      
      try{
        for(int i=0; i<tracks.length; i++){
          Track track = tracks[i].getTrack();

          ArtistSimplified[] artist = track.getArtists();

          String nameTrack = track.getName().replace(';','-').replace(',','-'); //para correção do nome da música com ;

          infoTrackAux = GetTracksPlaylist.infoTrack;
          infoTrackAux += /*"," + track.getId() + "," +*/ nameTrack +"," /*+ (int)track.getDurationMs() 
                          + "," + track.getPopularity() + ","*/;

          albumId = track.getAlbum().getId();

          GetAlbumRequest getAlbumRequest = spotifyApi.getAlbum(albumId)
            .market(CountryCode.BR)
            .build();  

          final Future<Album> albumFuture = getAlbumRequest.executeAsync();

          infoTrackAux += /*albumFuture.get().getId() + "," +*/ albumFuture.get().getName().replace("-", " ").replace(","," ") + "," + albumFuture.get().getReleaseDate().replace("/", "") + "," + albumFuture.get().getReleaseDatePrecision();

          trackId = track.getId();

          GetTrack.infoAudioFeatures = infoTrackAux;
          GetTrack audioFeatures = new GetTrack();

          audioFeatures.trackId = GetTracksPlaylist.trackId;
          audioFeatures.getTrack_Async();
        }  
      } catch (InterruptedException | ExecutionException e) {
        System.out.println("Error: " + e.getCause().getMessage());
      }
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("Error: " + e.getCause().getMessage());
    }
  }
  
}