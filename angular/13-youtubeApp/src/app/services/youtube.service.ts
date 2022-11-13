import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { YoutubeResponse } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCOvgmnDTSstL0_1iR9pBcwSrLEerVkrn8';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private htpp: HttpClient) { }

  getVideos(){

    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
          .set('part', 'snippet')
          .set('maxResults', '10')
          .set('playlistId', this.playlist)
          .set('key', this.apiKey)
          .set('pageToken', this.nextPageToken)

    return this.htpp.get<YoutubeResponse>(url, {params}).pipe(
      map( resp => {
      this.nextPageToken = resp.nextPageToken;
      return resp.items;
      }),
      map( items => items.map( video => video.snippet))
    );
  }
}
