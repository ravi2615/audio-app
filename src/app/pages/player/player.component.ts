import { PlaylistDialogComponent } from './../playlist-dialog/playlist-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ThemeModeService } from './../../services/theme-mode.service';
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  files: Array<any> = [];
  songList: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  songName:any;
  paramId:string;
  imgLink:string;
  current={_id:'',name:'',album_id:'',category:''}

  constructor(private dialog: MatDialog, private route: ActivatedRoute, public audioService: AudioService, public themeModeService: ThemeModeService, private cloudService: CloudService) {}
    ngOnInit(): void {
      
    this.route.params.subscribe( params => 
      this.paramId = params.album
      );
      
    // console.log(this.paramId);
    // get media files
    this.cloudService.getFiles().subscribe(files => {
      this.songList = files[this.paramId].song;
      this.files = this.songList;
      // console.log(this.files)
    });

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });

    this.currentFile={index:this.audioService.currentFile._id,file:this.audioService.currentFile};
    
  }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
      if(this.state.duration==this.state.currentTime)
      this.next();
      
    });
    
  }

  next() {
  let index = (this.audioService.currentFile._id + 1)%(this.songList.length);
  const file = this.songList[index];
  this.openFile(file);
  // console.log(this.currentFile.index);
  
  
}

  openFile(file,index?) {
    // console.log("index",file)
    this.audioService.currentFile=file;
    // console.log(this.audioService.currentFile._id,this.audioService.currentFile.name,this.audioService.currentFile.album_id);
    this.current._id=index;
    this.current.name=this.audioService.currentFile.name
    this.current.album_id=this.audioService.currentFile.album_id;
    this.current.category=this.audioService.currentFile.category;
    localStorage.setItem("current",JSON.stringify(this.current));
    this.audioService.stop();
    this.playStream(file.url);
    
    
  }
 

  addToPlaylist(file){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = file;
    this.dialog.open(PlaylistDialogComponent, dialogConfig);
  }
}


