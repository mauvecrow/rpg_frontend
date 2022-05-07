import { Component, OnInit, Input } from '@angular/core';
import { GameMeta } from 'src/app/services/game-meta';
import { trigger, style, state, animate, transition } from '@angular/animations'


@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css'],
  animations: [
    trigger('hpChange', [
      state('false',
        style({
          width: '{{currentHp}}%'
        }), {
          params: {currentHp: 100} 
        }
      ),
      state('true',
        style({
          width: '{{currentHp}}%'
        }),
        {
          params: { currentHp: 100 }
        }
      ),
      transition('* => *', [
        animate('0.75s 0.25s ease-out')
      ])
    ])
  ]
})
export class VisualsComponent implements OnInit {

  @Input() meta: GameMeta[] = [];
  @Input() rounds!: number;

  get gc1() {
    return this.meta[0].gameCharacter;
  }

  get gc2() {
    return this.meta[1].gameCharacter;
  }

  get hp1Percentage() {
    return this.gc1.stats['Health']/this.maxHealth1 * 100;
  } 

  // get hasHp1Changed() {
  //   return this.gc1.stats['Health'] === this.
  // }

  profile1?: string;
  profile2?: string;
  maxHealth1: number = -1;
  prevHealth1: number = 0;
  maxEnergy1: number = -1;
  maxHealth2: number = -1;
  maxEnergy2: number = -1;
  

  constructor() { }

  ngOnInit(): void {
    this.profile1 = 'data:image/png;base64,' + this.gc1.profile;
    this.profile2 = 'data:image/png;base64,' + this.gc2.profile;
    this.maxHealth1 = this.gc1.stats['Health'];
    this.maxHealth2 = this.gc2.stats['Health'];
    this.maxEnergy1 = this.gc1.stats['Energy'];
    this.maxEnergy2 = this.gc2.stats['Energy'];
  }

}
