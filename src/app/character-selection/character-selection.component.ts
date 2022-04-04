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
  roster: string[] = [];

  ngOnInit(): void {
    this.setupRoster();
  }

  private setupRoster(): void {
    this.charactersService.getCharacters()
      .subscribe( gc => 
        {
          this.rosterData = gc
          this.rosterData.forEach(
            gc => this.roster.push('data:image/png;base64,' + gc.avatar)
          )
        });
  }

}
