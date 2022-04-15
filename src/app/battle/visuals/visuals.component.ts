import { Component, OnInit, Input } from '@angular/core';
import { GameCharacter } from 'src/app/services/game-character';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css']
})
export class VisualsComponent implements OnInit {

  @Input() gc1!: GameCharacter;
  @Input() gc2!: GameCharacter;

  profile1?: string;
  profile2?: string;
  
  constructor() { }

  ngOnInit(): void {
    this.profile1 = 'data:image/png;base64,' + this.gc1.profile;
    this.profile2 = 'data:image/png;base64,' + this.gc2.profile;
  }

}
