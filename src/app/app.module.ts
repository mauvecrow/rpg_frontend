import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AvatarComponent } from './character-selection/avatar/avatar.component';
import { ProfileComponent } from './character-selection/profile/profile.component';
import { BattleComponent } from './battle/battle.component';
import { VisualsComponent } from './battle/visuals/visuals.component';
import { CommandComponent } from './battle/command/command.component';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectionComponent,
    WelcomeComponent,
    AvatarComponent,
    ProfileComponent,
    BattleComponent,
    VisualsComponent,
    CommandComponent,
  ],
  imports: [
    BrowserModule,
    AdminDashboardModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
