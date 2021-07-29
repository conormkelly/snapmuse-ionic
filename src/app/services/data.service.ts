import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

export interface Message {
  title: string;
  date: string;
  id: number;
  imageUrl: string;
}

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
  public messages: Message[] = [
    {
      title: 'Train',
      date: '05/07/2021',
      id: 0,
      imageUrl:
        'https://images.pexels.com/photos/962985/pexels-photo-962985.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      title: 'Glass Roof',
      date: '28/06/2021',
      id: 1,
      imageUrl:
        'https://images.pexels.com/photos/573892/pexels-photo-573892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      title: 'Bokeh',
      date: '21/06/2021',
      id: 2,
      imageUrl:
        'https://images.pexels.com/photos/691865/pexels-photo-691865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      title: 'Body Of Water',
      date: '14/06/2021',
      id: 3,
      imageUrl:
        'https://images.pexels.com/photos/1072842/pexels-photo-1072842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      title: 'Rise',
      date: '07/06/2021',
      id: 4,
      imageUrl:
        'https://images.pexels.com/photos/1668911/pexels-photo-1668911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      title: 'Pine',
      date: '01/06/2021',
      id: 5,
      imageUrl:
        'https://images.pexels.com/photos/8552529/pexels-photo-8552529.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    },
  ];

  public comments: any[] = [
    {
      title: 'My Song',
      user: 'XyzMan',
      url: 'https://snapmuse-audio.s3.eu-west-1.amazonaws.com/6102d4542f873c407cf8a4be',
      isLiked: false,
      likeCount: 0,
    },
    {
      title: 'Another Entry',
      user: 'collster5000',
      url: 'https://snapmuse-audio.s3.eu-west-1.amazonaws.com/6102d4542f873c407cf8a4be',
      isLiked: true,
      likeCount: 3,
    },
    {
      title: 'Testing',
      user: 'ConorK',
      url: 'https://snapmuse-audio.s3.eu-west-1.amazonaws.com/6102d4542f873c407cf8a4be',
      isLiked: false,
      likeCount: 2,
    },
  ];

  public audioSubject: Subject<AudioData> = new Subject();

  constructor() {}

  public getMessages(): Message[] {
    return this.messages;
  }

  public getComments() {
    return this.comments;
  }

  public loadAudio({ url, user, title }) {
    if (!this.audio) {
      this.audio = new Audio();
    }
    if (this.audio.src !== url) {
      this.audio.src = url;
      this.audio.onloadeddata = () => {
        this.audioSubject.next({ audio: this.audio, user, title });
        this.audio.play();
      };
      this.audio.load();
    }
  }

  public getAudioSubscription(): Observable<AudioData> {
    return this.audioSubject.asObservable();
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
}
