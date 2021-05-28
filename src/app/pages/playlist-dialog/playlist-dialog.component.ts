import { PlaylistService } from './../../services/playlist.service';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.scss']
})
export class PlaylistDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA)  public data: any, private dialogRef: MatDialogRef<any> , private playlistService : PlaylistService) {
   }
playlist= {name:'',file:[]}
filesPlaylist: any;
isClicked=false;
playlistName='';
  ngOnInit(): void {
    
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
        // console.log(k);
        
    });
  }
  onSelect(ev?){

    this.playlistService.getFiles().subscribe(res=>{
      // console.log(res);
    this.playlistService.files = res.filter(item=>{
        return item.file._id!=this.data._id;
      })
    })
    // console.log(this.playlistService.files)
    
    this.data.category="playlist";

    if(this.isClicked){
      this.playlist.name=ev.source.value;
      this.playlist.file=this.data;
      // console.log(this.playlistService.files);
    }
    else{
      this.playlist.name=this.playlistName;
      this.playlist.file=this.data;
      // console.log(this.playlist);
    }
    
    this.playlistService.files.push(this.playlist);
    localStorage.setItem("files",JSON.stringify(this.playlistService.files));
    
    this.dialogRef.close();
  }

}
