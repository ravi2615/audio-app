export interface StreamState {
    playing: boolean;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number | undefined;
    currentTime: number | undefined;
    canplay: boolean;
    error: boolean;
    load?:boolean;
  }
  export interface CurrentFile {
    _id:any,
    url:any,
    name:any,
    artist:any,
    category:any,
    album_id:any,
    album_title:any,
    image:any,
  }