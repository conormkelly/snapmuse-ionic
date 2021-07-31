import { Injectable } from '@angular/core';
export interface AudioData {
  audio: HTMLAudioElement;
  user: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public audio: HTMLAudioElement;

  public comments: any[] = [
    {
      title: 'My Song',
      user: 'XyzMan',
      url: 'https://snapmuse-audio.s3.eu-west-1.amazonaws.com/6102d4542f873c407cf8a4be',
      isLiked: false,
    },
    {
      title: 'Another Entry',
      user: 'collster5000',
      url: 'https://snapmuse-audio.s3.eu-west-1.amazonaws.com/6102d4542f873c407cf8a4be',
      isLiked: true,
    },
    {
      title: 'Testing',
      user: 'ConorK',
      url: 'https://snapmuse-audio.s3.eu-west-1.amazonaws.com/6102d4542f873c407cf8a4be',
      isLiked: false,
    },
  ];

  constructor() {}

  public getComments() {
    return this.comments;
  }
}
