import { PlaylistComponent } from './pages/playlist/playlist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './pages/player/player.component';
import { HomeComponent } from './pages/home/home.component';
// import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
    { path: 'playlist/?:album', component: PlaylistComponent },
    { path: 'allsong/?:album', component: PlayerComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}