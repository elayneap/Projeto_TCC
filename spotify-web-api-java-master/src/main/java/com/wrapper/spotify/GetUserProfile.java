package com.wrapper.spotify;

import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.requests.data.users_profile.GetUsersProfileRequest;
import com.wrapper.spotify.model_objects.specification.User;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class GetUserProfile {
  public static String accessToken = "";
  public static final String userId = ClientCredentialsExample.idGlobal;

  private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
          .setAccessToken(accessToken)
          .build();
  
  private static final GetUsersProfileRequest getUsersProfileRequest = spotifyApi.getUsersProfile(userId)
          .build();

  public static void getUsersProfile_Sync() throws SpotifyWebApiException {
    try {
      final User user = getUsersProfileRequest.execute();

      System.out.println("Display name: " + user.getDisplayName());
    } catch (IOException | SpotifyWebApiException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }

  public static void getUsersProfile_Async() {
    try {
        final Future<User> userFuture = getUsersProfileRequest.executeAsync();

        final User user = userFuture.get();

        System.out.println("Display name: " + user.getDisplayName());
        System.out.println("Id User: " + user.getId());
        
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("Error: " + e.getCause().getMessage());
    }
  }
}
