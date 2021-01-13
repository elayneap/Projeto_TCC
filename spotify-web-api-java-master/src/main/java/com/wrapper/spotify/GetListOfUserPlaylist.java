package com.wrapper.spotify;

import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.Image;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.PlaylistSimplified;
import com.wrapper.spotify.requests.data.playlists.GetListOfUsersPlaylistsRequest;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.io.FileWriter;

public class GetListOfUserPlaylist {
  public static String accessToken = "";
  public static String userId = ClientCredentialsExample.idGlobal;
  public static String idPlaylistGlobal = "";
  
  private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
          .setAccessToken(accessToken)
          .build();
  
  private static final GetListOfUsersPlaylistsRequest getListOfUsersPlaylistsRequest = spotifyApi
          .getListOfUsersPlaylists(userId)
          .limit(50)
          //.offset(0)
          .build();
  
  public static String sFileName = "C:\\Users\\elayne.paraiba\\Documents\\UFBA\\Arquivos_gerados\\dados_importacao.csv";
  
  public static void getListOfUsersPlaylists_Sync() {
    try {
      final Paging<PlaylistSimplified> playlistSimplifiedPaging = getListOfUsersPlaylistsRequest.execute();

      System.out.println("Total: " + playlistSimplifiedPaging.getTotal());
    } catch (IOException | SpotifyWebApiException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }

  public static void getListOfUsersPlaylists_Async() { 
      
    String infoPlaylist = "";
      
    try {
      final Future<Paging<PlaylistSimplified>> pagingFuture = getListOfUsersPlaylistsRequest.executeAsync();

      final Paging<PlaylistSimplified> playlistSimplifiedPaging = pagingFuture.get();
      
      PlaylistSimplified[] playlists = playlistSimplifiedPaging.getItems();
      
        try
        {   
          FileWriter writer = new FileWriter(sFileName);

          writer.append("user_id");
          writer.append(',');
          writer.append("playlist");
          writer.append(',');
          writer.append("name");
          writer.append(',');
          writer.append("album_name");
          writer.append(',');
          writer.append("album_date");
          writer.append(',');
          writer.append("album_date_precision");
          writer.append(',');
          writer.append("danceability");
          writer.append(',');
          writer.append("energy");
          writer.append(',');
          writer.append("speechiness");
          writer.append(',');
          writer.append("acousticness");
          writer.append(',');
          writer.append("instrumentalness");
          writer.append(',');
          writer.append("liveness");
          writer.append(',');
          writer.append("valence");
          writer.append('\n');

          writer.flush();
          writer.close();
        }
        catch(IOException e)
        {
           e.printStackTrace();
           System.out.println("Erro na escrita do arquivo");
        }
        
        for(int i=0; i<playlists.length; i++){
          System.out.println("Playlist " + (i+1) + " = " + playlists[i].getName());

          Image[] image = playlists[i].getImages();

          infoPlaylist = "";
          infoPlaylist = userId + "," + playlists[i].getName() + ",";

          GetListOfUserPlaylist.idPlaylistGlobal = playlists[i].getId();

          GetTracksPlaylist.infoTrack = infoPlaylist;
          GetTracksPlaylist Tracks = new GetTracksPlaylist();

          Tracks.playlistId = GetListOfUserPlaylist.idPlaylistGlobal;

          Tracks.getPlaylistsTracks_Async();

        } 
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("Error: " + e.getCause().getMessage());
      System.out.println("Erro para criar os arrays para as músicas");
    }
    
  }
}
