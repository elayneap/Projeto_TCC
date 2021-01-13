package com.wrapper.spotify;

import com.neovisionaries.i18n.CountryCode;
import static com.wrapper.spotify.GetListOfUserPlaylist.sFileName;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.AudioFeatures;
import com.wrapper.spotify.model_objects.specification.Track;
import com.wrapper.spotify.requests.data.tracks.GetAudioFeaturesForTrackRequest;
import com.wrapper.spotify.requests.data.tracks.GetTrackRequest;
import java.io.FileWriter;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class GetTrack {
  public static String accessToken = "";
  public String trackId = GetTracksPlaylist.trackId;
  public static String infoAudioFeatures = "";

  private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
          .setAccessToken(accessToken)
          .build();
  
  private /*static*/ final GetTrackRequest getTrackRequest = spotifyApi.getTrack(trackId)
          .market(CountryCode.BR)
          .build();
  
  private /*static*/ final GetAudioFeaturesForTrackRequest GetAudioFeaturesForTrackRequest = spotifyApi.getAudioFeaturesForTrack(trackId)
          .build();

  public /*static*/ void getTrack_Sync() {
    try {
      final Track track = getTrackRequest.execute();

      System.out.println("Name: " + track.getName());
    } catch (IOException | SpotifyWebApiException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }

  public /*static*/ void getTrack_Async() {
      
    String infoAudioFeaturesAux = "";
    
    try {
      final Future<Track> trackFuture = getTrackRequest.executeAsync();
      final Future<AudioFeatures> audioFuture = GetAudioFeaturesForTrackRequest.executeAsync();

      final Track track = trackFuture.get();
      final AudioFeatures audioFeatures = audioFuture.get();

        BigDecimal bd1 = new BigDecimal(audioFeatures.getAcousticness()).setScale(4, RoundingMode.HALF_EVEN);
        BigDecimal bd2 = new BigDecimal(audioFeatures.getInstrumentalness()).setScale(4, RoundingMode.HALF_EVEN);
      
      infoAudioFeaturesAux += infoAudioFeatures + "," + audioFeatures.getDanceability()
            + "," + audioFeatures.getEnergy()
            //+ "," + audioFeatures.getLoudness()
            //+ "," + audioFeatures.getMode()
            + "," + audioFeatures.getSpeechiness()
            + "," + bd1
            + "," + bd2
            //+ "," + audioFeatures.getAcousticness()
            //+ "," + audioFeatures.getInstrumentalness()
            + "," + audioFeatures.getLiveness()
            + "," + audioFeatures.getValence();
            //+ "," + audioFeatures.getTempo()
            //+ "," + audioFeatures.getId()
            //+ "," + audioFeatures.getDurationMs()
            //+ "," + audioFeatures.getTimeSignature();
      
      try {   
        FileWriter writer = new FileWriter(sFileName, true);

        writer.append(infoAudioFeaturesAux);
        writer.append('\n');
               
        writer.flush();
        writer.close();
      }
      catch(IOException e)
      {
         e.printStackTrace();
      }
      
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("Error: " + e.getCause().getMessage());
    }
  }
  
}