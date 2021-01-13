package com.wrapper.spotify;

import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import com.wrapper.spotify.requests.data.AbstractDataRequest;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.LineNumberReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class ClientCredentialsExample {
  private static final String clientId = "0cda23dafb9a4f2e8f718cd9794951e4";
  private static final String clientSecret = "c94274b31ea944ba8ab69b5ceead8173";
  public static String idGlobal = "spotify"; //spotify, 11135746947 (Jéssica), 12158075911 (Luana)' , 12170052496 (Elayne)
  //vanessagalrao, 12154977371 (Larissa), 22atav4gumgajmzu4i3jx4xua (Ana Paula), 12142462379 (Jorge)
  //douradopedro, 225jyk7jzbguolpbmgsgq6oby (Fran), 12165492447 (Leandro), ygormutti
  private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
          .setClientId(clientId)
          .setClientSecret(clientSecret)
          .build();
  
  private static final ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
          .build();

private static void Ordenar_arquivo(String caminho_entrada, String caminho_saida){
        String[][] registros;
        int i, j, track_id, id_playlist;
        String linha, playlist_anterior;
        String[] campos, trocar_data;
        String[] camposOrdenacao = new String[14];
        DateFormat formatarData = new SimpleDateFormat("dd/MM/yy");
        String playlist_arquivo = "";
        File arquivo_gravar;
        FileWriter novo_arquivo;
        BufferedWriter escrever_arquivo;        
        
        try {
            File arquivo = new File(caminho_entrada);
            
            LineNumberReader numeroLinhas = new LineNumberReader(new FileReader(arquivo));
            
            numeroLinhas.skip(arquivo.length());
            
            registros = new String [numeroLinhas.getLineNumber()][14];
            
            FileReader lerArquivo = new FileReader(caminho_entrada);
            
            BufferedReader lerLinhas = new BufferedReader(lerArquivo);
            
            for (i=0; i<numeroLinhas.getLineNumber(); i++){
                linha = lerLinhas.readLine();
                
                campos = linha.split(",");
                
                for (j=0; j < campos.length; j++){
                    if (j == 4 && i > 0){
                        switch (campos[5]){
                            case "YEAR":
                                campos[j] = campos[j] + "/07/01";
                                break;
                            case "MONTH":
                                campos[j] = campos[j] + "/15";
                                break;
                        }    
                        
                        registros[i][j] = campos[j].replace("-", "/");

                        trocar_data = registros[i][j].split("/");

                        registros[i][j] = trocar_data[2] + "/" + trocar_data[1] + "/" + trocar_data[0].substring(2);
                    }
                    else{
                        registros[i][j] = campos[j];
                    }
                }
                
                registros[i][13] = "";
            }
            
            for (j=1; j<numeroLinhas.getLineNumber(); j++){
                for (i=1; i<numeroLinhas.getLineNumber() - 1; i++){
                    if (formatarData.parse(registros[i][4]).after(formatarData.parse(registros[i+1][4]))
                        && registros[i][1].equals(registros[i+1][1])){
                        camposOrdenacao[0] = registros[i][0];
                        camposOrdenacao[1] = registros[i][1];
                        camposOrdenacao[2] = registros[i][2];
                        camposOrdenacao[3] = registros[i][3];
                        camposOrdenacao[4] = registros[i][4];
                        camposOrdenacao[5] = registros[i][5];
                        camposOrdenacao[6] = registros[i][6];
                        camposOrdenacao[7] = registros[i][7];
                        camposOrdenacao[8] = registros[i][8];
                        camposOrdenacao[9] = registros[i][9];
                        camposOrdenacao[10] = registros[i][10];
                        camposOrdenacao[11] = registros[i][11];
                        camposOrdenacao[12] = registros[i][12];
                        camposOrdenacao[13] = registros[i][13];
                        
                        registros[i][0] = registros[i+1][0];
                        registros[i][1] = registros[i+1][1];
                        registros[i][2] = registros[i+1][2];
                        registros[i][3] = registros[i+1][3];
                        registros[i][4] = registros[i+1][4];
                        registros[i][5] = registros[i+1][5];
                        registros[i][6] = registros[i+1][6];
                        registros[i][7] = registros[i+1][7];
                        registros[i][8] = registros[i+1][8];
                        registros[i][9] = registros[i+1][9];
                        registros[i][10] = registros[i+1][10];
                        registros[i][11] = registros[i+1][11];
                        registros[i][12] = registros[i+1][12];
                        registros[i][13] = registros[i+1][13];

                        registros[i+1][0] = camposOrdenacao[0];
                        registros[i+1][1] = camposOrdenacao[1];
                        registros[i+1][2] = camposOrdenacao[2];
                        registros[i+1][3] = camposOrdenacao[3];
                        registros[i+1][4] = camposOrdenacao[4];
                        registros[i+1][5] = camposOrdenacao[5];
                        registros[i+1][6] = camposOrdenacao[6];
                        registros[i+1][7] = camposOrdenacao[7];
                        registros[i+1][8] = camposOrdenacao[8];
                        registros[i+1][9] = camposOrdenacao[9];
                        registros[i+1][10] = camposOrdenacao[10];
                        registros[i+1][11] = camposOrdenacao[11];
                        registros[i+1][12] = camposOrdenacao[12];
                        registros[i+1][13] = camposOrdenacao[13];
                    }
                }
            }

            track_id = 0;
            id_playlist = 0;
            playlist_anterior = "";
            
            arquivo_gravar = new File(caminho_saida + "Playlist 1.csv");

            novo_arquivo = new FileWriter(arquivo_gravar);

            escrever_arquivo = new BufferedWriter(novo_arquivo);            
            
            for (i=1; i<numeroLinhas.getLineNumber(); i++){
                if (!playlist_anterior.equals(registros[i][1])){
                    track_id = 0;
                    
                    if (i > 1) {
                        id_playlist++;
                        playlist_arquivo = "Playlist " + id_playlist + ".csv"; 
                        
                        escrever_arquivo.close();
                        novo_arquivo.close();                    

                        arquivo_gravar = new File(caminho_saida + playlist_arquivo);

                        novo_arquivo = new FileWriter(arquivo_gravar);

                        escrever_arquivo = new BufferedWriter(novo_arquivo);

                        escrever_arquivo.write("user_id,playlist,name,album_name,album_date,album_date_precision,danceability,energy,speechiness,acousticness,instrumentalness,liveness,valence,track");
                        escrever_arquivo.newLine();
                    }
                }
                
                track_id++;
                
                escrever_arquivo.write(registros[i][0] + "," +
                                       registros[i][1] + "," +
                                       registros[i][2] + "," +
                                       registros[i][3] + "," +
                                       registros[i][4] + "," +
                                       registros[i][5] + "," +
                                       registros[i][6] + "," +
                                       registros[i][7] + "," +
                                       registros[i][8] + "," +
                                       registros[i][9] + "," +
                                       registros[i][10] + "," +
                                       registros[i][11] + "," +
                                       registros[i][12] + "," +
                                       track_id);
                escrever_arquivo.newLine();
                
                playlist_anterior = registros[i][1];
            }
            
            escrever_arquivo.close();
            novo_arquivo.close();
            numeroLinhas.close();
            lerArquivo.close();
            lerLinhas.close();
            arquivo.delete();

        } catch (FileNotFoundException ex) {
            System.out.println("Arquivo não existe - " + ex.getMessage());
        } catch (IOException ex) {
            System.out.println("Erro na leitura do arquivo - " + ex.getMessage());
        } catch (ParseException ex) {
            System.out.println("Erro na conversão de datas - " + ex.getMessage());
        }
    }
  
  public static void clientCredentials_Sync() {
    try {
      final ClientCredentials clientCredentials = clientCredentialsRequest.execute();

      // Set access token for further "spotifyApi" object usage
      spotifyApi.setAccessToken(clientCredentials.getAccessToken());

      System.out.println("Expired in: " + clientCredentials.getExpiresIn());
    } catch (IOException | SpotifyWebApiException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }

  public static String clientCredentials_Async() {
    try {
      final Future<ClientCredentials> clientCredentialsFuture = clientCredentialsRequest.executeAsync();

      final ClientCredentials clientCredentials = clientCredentialsFuture.get();

      // Set access token for further "spotifyApi" object usage
      spotifyApi.setAccessToken(clientCredentials.getAccessToken());

      System.out.println("Token: " + clientCredentials.getAccessToken());
      System.out.println("Expired in: " + clientCredentials.getExpiresIn());
      
      return clientCredentials.getAccessToken();
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("Error: " + e.getCause().getMessage());
      return "";
    }
  }
  
    public static void main(String[] args) {
        String token = ClientCredentialsExample.clientCredentials_Async();
        
        AbstractDataRequest.accessTokenGlobal = token;
        
        GetTracksPlaylist.accessToken = token;
        GetUserProfile.accessToken = token;
        GetListOfUserPlaylist.accessToken = token;
        
        GetUserProfile.getUsersProfile_Async();   
        //chama a classe que retorna as playlists do usuário
        GetListOfUserPlaylist.userId = GetUserProfile.userId;
        
        try{
            GetListOfUserPlaylist.getListOfUsersPlaylists_Async();
        } catch (Exception e) {
            System.out.println("Erro principal");
            System.out.println("Error: " + e.getCause().getMessage());
        }
        
        Ordenar_arquivo("C:\\Users\\elayne.paraiba\\Documents\\UFBA\\Arquivos_gerados\\dados_importacao.csv",
                        "C:\\Users\\elayne.paraiba\\Documents\\UFBA\\Arquivos_gerados\\");
    }
}