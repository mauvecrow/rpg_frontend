import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './battle/battle.component';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'character-selection', component: CharacterSelectionComponent},
  {path: 'battle', component: BattleComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
