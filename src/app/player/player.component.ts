import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css', '../../styles.css'],
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @Input() audioSrc: any;

  playing = false;

  audio: any;

  ngOnInit() {
    this.audio = new Audio(this.audioSrc);
  }

  isPlaying() {
    this.playing = !this.playing;
    if (this.playing) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  ngAfterViewInit() {
    this.audio.addEventListener('ended', () => (this.playing = false));
  }
}
