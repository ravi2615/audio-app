import { SwUpdate } from '@angular/service-worker';

import { ThemeModeService } from './services/theme-mode.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { StreamState } from 'src/app/interfaces/stream-state';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioService } from './services/audio.service';
import { CloudService } from './services/cloud.service';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  title="audioApp"

  files= [];
  songList: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  songName:any;
  searchFile: Observable<Array<any>[]>;
  searchClicked=false;
  scrollTop=0;
  hideMainToolbar=false;
  paramId:string;
  current={_id:'',name:'',album_id:'',category:'',album_title:''}
  constructor(private updates: SwUpdate, public audioService: AudioService, public themeModeService: ThemeModeService ,private cloudService: CloudService, private playlistService : PlaylistService,private router: Router) {  
    
    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      updates.activateUpdate().then(()=> document.location.reload());
    });
  }

  ngOnInit(): void {
  //   // console.log(localStorage.getItem("current"))
    if(localStorage.getItem("current")&&localStorage.getItem("current") != 'undefined' && localStorage.getItem("current") != '0' && localStorage.getItem("current") != null){
      this.audioService.currentFile =JSON.parse(localStorage.getItem("current"));      
    // console.log(this.audioService.currentFile)
  }

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });


    

  }


  fileLoad(){
    
    // get media files
    if(this.audioService.currentFile.category=='allsong')
    this.cloudService.getFiles().subscribe(files => {
      this.files = files[this.audioService.currentFile.album_id].song;
      // this.files = this.songList;
      // console.log(this.files)
    });
    else if(this.audioService.currentFile.category=='playlist'){
     this.files=[]
      this.playlistService.getFiles().subscribe(files => {
        for(var i in files){
          // console.log(this.audioService.currentFile.album_title)
          if(files[i]["name"]==this.audioService.currentFile.album_title){
            // this.paramId=files[i]["name"];
            this.files.push(files[i]["file"]);
            // console.log(files[i]["file"])
          }
        }
  
      });
    }
  // }
  // console.log(this.files)
}

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
      if(this.state.duration==this.state.currentTime)
      this.next()
    });
    
  }

  openFile(file) {
    // console.log("index",file)
    this.currentFile = { file };
    // this.audioService.stop();
    this.audioService.currentFile=file;
    // console.log(this.audioService.currentFile)
    this.current._id=this.audioService.currentFile._id;
    this.current.name=this.audioService.currentFile.name
    this.current.album_id=this.audioService.currentFile.album_id;
    this.current.category=this.audioService.currentFile.category;
    this.current.category= this.paramId;
    localStorage.setItem("current",JSON.stringify(this.current));
    this.playStream(file.url);

  }

  pause() {
    this.audioService.pause();
  }

  play() {
        this.audioService.play();
        // console.log("_",this.state.readableCurrentTime=='',"ud",( localStorage.getItem("current")!='undefined' ,"nl",localStorage.getItem("current")!=null));
        
        if(!this.state?.readableCurrentTime &&( localStorage.getItem("current")!='undefined' && localStorage.getItem("current")!=null)){
          this.audioService.currentFile=JSON.parse(localStorage.getItem("current"));
          // console.log("play",this.audioService.currentFile)
          this.fileLoad();
          this.openFile(this.files[this.audioService.currentFile._id])
        }
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    this.fileLoad();
    if(this.audioService.currentFile._id!=this.files.length){
    let index = (this.audioService.currentFile._id + 1)%(this.files.length);
    const file = this.files[index];
    // console.log("index",this.files)
    this.openFile(file);
  }}

  previous() {
    // const index = this.playerF.currentFile.index==0? this.songList.length-1: this.playerF.currentFile.index-1;
    this.fileLoad();
    if(this.audioService.currentFile._id!=this.files.length){
    let index = this.audioService.currentFile._id==0? this.files.length-1: this.audioService.currentFile._id-1;
    const file = this.files[index];
    // console.log("index",this.audioService.currentFile._id)
    this.openFile(file);
  }}


  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
filef:any= []
  search(ev){
    if(this.songName != ''){
  //  this.files = 
      this.cloudService.getFiles().subscribe(files =>{
        files.filter(res=>{
          for(var key in res){
            if(key == 'song')
              for(var song in res[key]){
                this.filef.push(res[key][song])
                // return res[key][song]["name"].toLowerCase().match(ev.toLowerCase());
              }
          }
        })
    })
    this.searchFile = Object(this.filef).filter(res=>{
            return res.name.toLowerCase().match(ev.toLowerCase());
          })
  }
    
  }

    onScroll(event){
      this.hideMainToolbar = this.scrollTop < event.target.scrollTop;
      this.scrollTop = event.target.scrollTop; 
      // document.getElementsByClassName("main-toolbar")
      console.log(event.target.srcrollTop);
      
    }

    switchTheme(){
      this.themeModeService.darkMode=!this.themeModeService.darkMode;
      localStorage.setItem("theme",this.themeModeService.darkMode?'dark':'light')
    }

  }






























  
  // // audioObj = new Audio();
  // // audioEvents = [
  // //   "ended",
  // //   "error",
  // //   "play",
  // //   "playing",
  // //   "pause",
  // //   "timeupdate",
  // //   "canplay",
  // //   "loadedmetadata",
  // //   "loadstart"
  // // ];
  // // songList = [
  // //   {
  // //     url: '../assets/audio/(webmusic.in)_Hum-Tumko-Nigaahon-Mein.mp3',
  // //     name: 'Hum Tumko Nigaahon Mein',
  // //     artist: "Ravi Shankar",
  // //   },
  // //   {
  // //     url: '../assets/audio/(webmusic.in)_Jab-Aa-Jaate-Ho-Samne.mp3',
  // //     name: 'Jab Tum Aa Jaate Ho Samne',
  // //     artist: "Ravi Shankar",
  // //   },
  // //   {
  // //     url: '../assets/audio/(webmusic.in)_Maharaja.mp3',
  // //     name: 'Maharaja',
  // //     artist: "Ravi Shankar",
  // //   },
  // //   {
  // //     url: '../assets/audio/[iSongs.info] 02 - Oh Priya Priya.mp3',
  // //     name: 'Oh Priya Priya',
  // //     artist: "Ravi Shankar",
  // //   },
  // //   {
  // //     url: '../assets/audio/01 - Aaja Mahiya - MusicBadshah.Com.mp3',
  // //     name: 'Aaja Mahiya',
  // //     artist: "Ravi Shankar",
  // //   },
  // //   {
  // //     url: '../assets/audio/01 - Aankhon Se Tune Kya - www.downloadming.com.mp3',
  // //     name: 'Aankhon Se Tune Kya',
  // //     artist: "Ravi Shankar",
  // //   },
  // // ];
  // // currentTime = '00:00:00';
  // // duration = '00:00:00';
  // // seek=0;
  // // songName:any;
  // // files=this.songList;
  // // isplay=false
  // // isPlaying=false
  // // isMute=false
  // // currentVol:any


  // // streamObserver(url){
  // //   return new Observable(observer => {

  // //     // Play audio
  // //     this.audioObj.src = url;
  // //     this.audioObj.load();
  // //     this.audioObj.play();

  // //     const handler = (event: Event) => {
  // //       // this.updateStateEvents(event);
  // //       // observer.next(event);
  // //       this.seek = this.audioObj.currentTime;
  // //       this.currentTime = this.formatTime(this.audioObj.currentTime);
  // //       this.duration = this.formatTime(this.audioObj.duration);
  // //     };

  // //     this.addEvent(this.audioObj, this.audioEvents, handler);
  // //     return () => {
  // //       // Stop Playing
  // //       this.audioObj.pause();
  // //       this.audioObj.currentTime = 0;
  // //       // remove event listeners
  // //       this.removeEvent(this.audioObj, this.audioEvents, handler);
  // //       // reset state
  // //       // this.resetState();
  // //     };
      
  // //   });
  // // }

  // // addEvent(obj, events, handler){
  // //   events.forEach(event => {
  // //     obj.addEventListener(event, handler);
  // //   });
  // // }

  // // removeEvent(obj, events, handler){
  // //   events.forEach(event => {
  // //     obj.removeEventListener(event, handler);
  // //   });
  // // }

  // // seekTo(ev) {
  // //   // console.log(ev.value);
  // //   // if (ev.cancelable) ev.preventDefault();
  // //   this.audioObj.currentTime = ev.value;
  // // }

  // // setVolume(ev){
  // //   // if (ev.cancelable) ev.preventDefault();
  // //   this.audioObj.volume = ev.value;
  // // }

  // // openFile(url) {
  // //   this.streamObserver(url).subscribe(event=>{

  // //   });
  // //   this.isplay=true
  // // } 

  // // play() {
  // //   this.isPlaying=!this.isPlaying
  // //   this.audioObj.play();
  // // }
 
  // // pause() {
  // //   this.isPlaying=!this.isPlaying
  // //   this.audioObj.pause();
  // //   // this.ngOnInit()
  // // }
 
  // // stop() {
  // //   this.isPlaying=!this.isPlaying
  // //   this.audioObj.pause();
  // //   this.audioObj.currentTime = 0; 
  // // }

  // // mute(){
  // //   this.isMute=!this.isMute;
  // //   this.currentVol=this.audioObj.volume
  // //   if(this.isMute)
  // //   this.audioObj.volume=0;
  // // }
  // // unmute(){
  // //   this.isMute=!this.isMute
  // //   if(!this.isMute)
  // //   this.audioObj.volume=this.currentVol;
  // // }

  // // formatTime(time: number, format: string = "HH:mm:ss") {
  // //   const momentTime = time * 1000;
  // //   return moment.utc(momentTime).format(format);
  // // }

  // // search(ev){
  // //   if(this.songName != ''){
  // //     this.files = Object(this.files).filter(res=>{
  // //       // console.log(ev)
  // //       return res.name.toLowerCase().match(ev.toLowerCase());
  // //     })
  // //   }else{
  // //     return this.files = this.songList;
  // //   }
  // // }

  