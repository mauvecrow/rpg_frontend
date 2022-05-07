import { Component, OnInit, Input } from '@angular/core';
import { GameMeta } from 'src/app/services/game-meta';
import { trigger, style, state, animate, transition } from '@angular/animations'
import { MetaChanges } from '../command/meta-changes';


@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css'],
  animations: [
    trigger('hpChange', [
      state('true',
        style({
          width: '{{currentHp}}%'
        }), {
          params: {currentHp: 100} 
        }
      ),
      state('false',
      style({
        width: '{{currentHp}}%'
      }), {
        params: {currentHp: 100} 
      }
      ),
      transition('false => true', [
        animate('0.75s 0.25s ease-out')
      ])
    ]),
    trigger('enChange', [
      state('true',
        style({
          width: '{{currentEn}}%'
        }), {
          params: {currentEn: 100} 
        }
      ),
      state('false',
      style({
        width: '{{currentEn}}%'
      }), {
        params: {currentEn: 100} 
      }
      ),
      transition('false => true', [
        animate('0.75s 0.25s ease-out')
      ])
    ])
  ]
})
export class VisualsComponent implements OnInit {

  @Input() meta: GameMeta[] = [];
  @Input() metaChanges?: MetaChanges;

  get gc1() {
    return this.meta[0].gameCharacter;
  }

  get gc2() {
    return this.meta[1].gameCharacter;
  }

  get hp1Percentage() {
    return this.gc1.stats['Health']/this.maxHealth1 * 100;
  }
   
  get hp2Percentage() {
    return this.gc2.stats['Health']/this.maxHealth2 * 100;
  } 

  get en1Percentage() {
    return this.gc1.stats['Energy']/this.maxEnergy1 * 100;
  }
   
  get en2Percentage() {
    return this.gc2.stats['Energy']/this.maxEnergy2 * 100;
  } 

  get stateChange(){
    if(this.metaChanges == undefined){
      return 'start';
    }
    let player = this.metaChanges.gameMetaPosition == 0 ? 'p1' : 'p2';
    let firstStat = this.metaChanges.statChanges[0][0];
    let statCode;
    switch(firstStat){
      case 'Health':
        statCode = 'hp';
        break;
      case 'Energy':
        statCode = 'en';
        break;
      default:
        statCode = 'stats';
        break;
    }
    // console.log('stat change: '+player + '-' + statCode);
    return player + '-' + statCode;
  }

  profile1?: string;
  profile2?: string;
  maxHealth1: number = -1;
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
