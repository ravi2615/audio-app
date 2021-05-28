import { ThemeModeService } from './../../services/theme-mode.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { StreamState } from 'src/app/interfaces/stream-state';
import { PlayerComponent } from './../player/player.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  files: Array<any> = [];
  // songList: Array<any> = [];
  filesPlaylist: Array<any>= []
  songPlaylist: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  songName:any;
  myArr=[];

  constructor(private audioService: AudioService, public themeModeService: ThemeModeService, private cloudService: CloudService, private playlistService : PlaylistService) {}
    
  ngOnInit(): void {
    // get media files
    this.cloudService.getFiles().subscribe(files => {
      this.files = files;
      // console.log(files)
    });

    this.playlistService.getFiles().subscribe(files => {
      // this.filesPlaylist=files;
      let k = files.reduce((acc, curr) => {
        let findname = acc.find((item) => {
          return item.name.toLowerCase() == curr.name.toLowerCase();
        });
        if (!findname) {
          acc.push(curr)
        }
        return acc;
      }, []);
      this.filesPlaylist=k
      // console.log(this.filesPlaylist);
      
      
    });

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }

  removeAll(){
    localStorage.removeItem("files")
    this.ngOnInit();
  }


}
