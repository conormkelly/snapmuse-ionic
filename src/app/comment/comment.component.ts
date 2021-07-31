import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from '../services/audio.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: any;

  constructor(private audioService: AudioService) {}

  ngOnInit() {}

  onPlay() {
    this.audioService.loadAudio(this.comment);
  }

  onDownload() {
    console.log('TODO: Implement me!');
  }

  isPlaying() {
    return (
      this.audioService.audio &&
      this.comment.recordingSrc === this.audioService.audio.src
    );
  }
}
