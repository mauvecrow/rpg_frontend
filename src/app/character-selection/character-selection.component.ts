import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { GameCharacter } from '../services/game-character';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {

  constructor(private charactersService: CharactersService) { }

  rosterData: GameCharacter[] | undefined;
  // roster: string[] = [];
  viewingCharacter?: GameCharacter | null;
  player1?: GameCharacter;
  player2?: GameCharacter;

  ngOnInit(): void {
    this.setupRoster();
  }

  private setupRoster(): void {
    this.charactersService.getCharacters()
      .subscribe( gc => 
        {
          this.rosterData = gc.filter( gc => gc.avatar != null)
        });
  }

  viewCharacter(choice: GameCharacter){
    this.viewingCharacter = choice;
  }

  selectPlayer(selection: GameCharacter){
    if(!this.player1){
      this.player1 = selection;
    }
    else {
      this.player2 = selection;
    }
    this.viewingCharacter = null;
  }

  getPlayer1Profile() {
    return this.player1 ? 'data:image/png;base64,' + this.player1.profile : null;
  }

  getPlayer2Profile() {
    return this.player2 ? 'data:image/png;base64,' + this.player2.profile : null;
  }

}
