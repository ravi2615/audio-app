import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService implements OnInit {

  constructor() { }
  files = [];
  ngOnInit(): void {
    this.files= localStorage.getItem("files") ==null?[]:JSON.parse(localStorage.getItem("files"));
    // console.log("bjhghj",this.files)
  }

  getFiles() {
    this.ngOnInit();
   return of(this.files);
  }
}
