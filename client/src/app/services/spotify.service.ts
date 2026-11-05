import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //Specifically, update the URI according to the base URL for express and the endpoint.
    var uri:string = "";
    uri = this.expressBaseUrl + endpoint;
    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //'/search/:category/:resource'
    var endpoint = "/search/" + category + "/" + encodeURIComponent(resource);
    return this.sendRequestToExpress(endpoint).then((data) => {
      switch(category) {
        case 'artist':
          return data.artists.items.map(
            (artist:any) => new ArtistData(artist)
          );

        case 'album':
          return data.albums.items.map(
            (album:any) => new AlbumData(album)
          );

        case 'track':
          return data.tracks.items.map(
            (track:any) => new TrackData(track)
          );

        default:
          console.log("NNNNNNNNNNNEEEEEEEEEEEEEEEEYYYYYYYYYYYYYYYYUUUUUUUUUUUUUUUUUUUUUUUUUMMMMMMMMMMMM")
          return [];
      }
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    var endpoint = "/artist/" + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((artist:any) => {
      return new ArtistData(artist);
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    var endpoint ="/artist-top-tracks/" + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.tracks.map(
        (tracks:any) => new TrackData(tracks)
      )
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    var endpoint ="/artist-albums/" + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.items.map(
        (albums:any) => new AlbumData(albums)
      )
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    var endpoint ="/album/" + encodeURIComponent(albumId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    var endpoint ="/album-tracks/" + encodeURIComponent(albumId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.items.map(
        (albumTracks:any) => new TrackData(albumTracks)
      )
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    var endpoint = "/track/" + encodeURIComponent(trackId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return new TrackData(data);
    })
  }
}