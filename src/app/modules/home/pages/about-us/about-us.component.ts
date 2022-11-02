import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }
  currentPlayingVideo: HTMLVideoElement;
  ngOnInit() {
    window.scroll(0, 0);
  }
  onPlayingVideo(event) {
    event.preventDefault();
    // play the first video that is chosen by the user
    if (this.currentPlayingVideo === undefined) {
        this.currentPlayingVideo = event.target;
        this.currentPlayingVideo.play();
    } else {
    // if the user plays a new video, pause the last one and play the new one
        if (event.target !== this.currentPlayingVideo) {
            this.currentPlayingVideo.pause();
            this.currentPlayingVideo = event.target;
            this.currentPlayingVideo.play();
        }
    }
}
scrolldown(){
  window.scrollTo(0,document.body.scrollHeight);
}
}
