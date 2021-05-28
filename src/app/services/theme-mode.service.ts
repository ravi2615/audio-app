import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeModeService {

  darkMode=false
  constructor() {
    if(localStorage.getItem('theme'))
    this.darkMode= localStorage.getItem('theme')=='dark'?true:false;
    // console.log(this.darkMode)
   }
}
