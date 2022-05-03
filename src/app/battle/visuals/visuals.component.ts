import { Component, OnInit, Input } from '@angular/core';
import { GameMeta } from 'src/app/services/game-meta';


@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css']
})
export class VisualsComponent implements OnInit {

  @Input() meta: GameMeta[] = [];

  get gc1(){
    return this.meta[0].gameCharacter;
  }

  get gc2(){
    return this.meta[1].gameCharacter;
  }

  profile1?: string;
  profile2?: string;
  
  constructor() { }

  ngOnInit(): void {
    this.profile1 = 'data:image/png;base64,' + this.gc1.profile;
    this.profile2 = 'data:image/png;base64,' + this.gc2.profile;
  }

}
