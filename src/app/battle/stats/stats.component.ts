import { Component, OnInit, Input } from '@angular/core';
import { GameMeta } from 'src/app/services/game-meta';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @Input() meta: GameMeta[] = [];

  get gc1(){
    return this.meta[0].gameCharacter;
  }

  get gc2(){
    return this.meta[1].gameCharacter;
  }

  get stats1(){
    let stats = [];
    for(let attr in this.gc1.stats){
      if(attr != 'Energy' && attr != 'Health'){
        stats.push([attr,this.gc1.stats[attr]])
      }
    }
    return stats;
  }
  
  get stats2(){
    let stats = [];
    for(let attr in this.gc2.stats){
      if(attr != 'Energy' && attr != 'Health'){
        stats.push([attr,this.gc2.stats[attr]])
      }
    }
    return stats;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
