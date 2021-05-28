import { ThemeModeService } from './../../services/theme-mode.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';
import { CloudService } from 'src/app/services/cloud.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  constructor(public audioService: AudioService,private router:Router,  private route: ActivatedRoute, public themeModeService: ThemeModeService, private cloudService: CloudService, public playlistService : PlaylistService) { }
  files=[];
  songList: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  songName:any;
  length:any;
  current={_id:'',name:'',album_id:'',category:'',album_title:''};
  paramId:string;
  afterRemove={name:'',file:[]}
  RemoveNew=[]
  ngOnInit(): void {

    this.route.params.subscribe( params => 
      this.paramId = params.album
      );
    // console.log(this.paramId);
    this.files=[];
    this.playlistService.getFiles().subscribe(files => {
      for(var i in files){
        if(files[i]["name"]==this.paramId){
          this.files.push(files[i]["file"]);
          // console.log(files[i]["file"])
        }
      }
    });
    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
    this.currentFile={index:this.audioService.currentFile._id,file:this.audioService.currentFile};
console.log(this.files);

    if(!this.files.length)
    this.router.navigate([''])

  }
 

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
      if(this.state.duration==this.state.currentTime)
      this.next()
    });
    
  }

  openFile(file,index?) {
    this.currentFile = { file };
    this.audioService.currentFile=file;
    this.current._id=index;
    this.current.name=this.audioService.currentFile.name;
    this.current.album_id= this.audioService.currentFile.album_id;
    this.current.category=this.audioService.currentFile.category;
    this.current.album_title= this.paramId;
    localStorage.setItem("current",JSON.stringify(this.current));
    this.audioService.stop();
    this.playStream(file.url);
    // console.log(file.url)
  }

  next() {
    let index = (this.audioService.currentFile._id + 1)%(this.songList.length);
    const file = this.songList[index];
    this.openFile(file);
    // console.log(this.currentFile.index);
  }


  removeFromPlaylist(index){
    this.files = this.files.filter((item) => item._id !== index)
    
    localStorage.removeItem("files")
    if(!this.files.length){
      this.router.navigate([''])
    }



  }

}
