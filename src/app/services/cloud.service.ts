import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  files: any = [
    {
      _id: 0,
      "album_title": "moody song",
      "song":[
        { 
          _id: 0,
          url: 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3', 
          name: 'Perfect',
          image: 'https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg',
          artist: 'Ed Sheeran',
          category: 'allsong',
          album_id: 0,
          album_title:"moody song",
        },
        {
          _id: 1,
          url: 'https://m.bestwap2.cam/load/MP3_Songs/Bollywood_90s_Love_Songs/90s_Romantic_Love_Songs/Ae_Nazneen_Suno_Na_-_Dil_Hi_Dil_Mein.mp3',
          name: 'Ae Nazneen Suno Na',
          artist: 'Abhijeet',
          category: 'allsong',
          album_id: 0,
          album_title:"moody song",
        },
        {
          _id: 2,
          url: 'https://m.bestwap2.cam/load/MP3_Songs/Bollywood_90s_Love_Songs/90s_Romantic_Love_Songs/Aa_Ab_Laut_Chalen_-_Title_Song.mp3',
          name: 'Aa Ab Laut Chalen',
          artist: 'Alka Yagnik & Udit Narayan',
          category: 'allsong',
          album_id: 0,
          album_title:"moody song",
        },
        {
          _id: 3,
          url: 'https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3',
          name: 'Man Atkeya Beparwah',
          artist: 'Nusrat Fateh Ali Khan',
          category: 'allsong',
          album_id: 0,
          album_title:"moody song",
        },
      ]
    },
    {
      _id: 1,
      "album_title": "romantic song",
      "song":[
        { 
          _id: 0,
          url: 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3', 
          name: 'Perfect',
          image: 'https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg',
          artist: 'Ed Sheeran',
          category: 'allsong',
          album_id: 1,
          album_title: "romantic song"
        },
        {
          _id: 1,
          url: 'https://m.bestwap2.cam/load/MP3_Songs/Bollywood_90s_Love_Songs/90s_Romantic_Love_Songs/Ae_Nazneen_Suno_Na_-_Dil_Hi_Dil_Mein.mp3',
          name: 'Ae Nazneen Suno Na',
          artist: 'Abhijeet',
          category: 'allsong',
          album_id: 1,
          album_title: "romantic song"
        },
        {
          _id: 2,
          url: 'https://m.bestwap2.cam/load/MP3_Songs/Bollywood_90s_Love_Songs/90s_Romantic_Love_Songs/Aa_Ab_Laut_Chalen_-_Title_Song.mp3',
          name: 'Aa Ab Laut Chalen',
          artist: 'Alka Yagnik & Udit Narayan',
          category: 'allsong',
          album_id: 1,
          album_title: "romantic song"
        },
        
      ],
    },
    {
      _id: 2,
      "album_title": "pehla pyar",
      "song":[
        { 
          _id: 0,
          url: 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3', 
          name: 'Perfect',
          image: 'https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg',
          artist: 'Ed Sheeran',
          category: 'allsong',
          album_id: 2,
          album_title: 'pehla pyar'
        },
        {
          _id: 1,
          url: 'https://m.bestwap2.cam/load/MP3_Songs/Bollywood_90s_Love_Songs/90s_Romantic_Love_Songs/Ae_Nazneen_Suno_Na_-_Dil_Hi_Dil_Mein.mp3',
          name: 'Ae Nazneen Suno Na',
          artist: 'Abhijeet',
          category: 'allsong',
          album_id: 2,
          album_title: 'pehla pyar'
        },
        
      ]
    },
    {
      _id: 3,
      "album_title": "love express",
      "song":[
        { 
          _id: 0,
          url: 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3', 
          name: 'Perfect',
          image: 'https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg',
          artist: 'Ed Sheeran',
          category: 'allsong',
          album_id: 3,
          album_title: 'love express',
        },
        
      ],
    },
  ]

  getFiles() {
   return of(this.files);
  }
}