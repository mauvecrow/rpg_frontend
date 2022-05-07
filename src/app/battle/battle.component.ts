import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { CharactersService } from '../services/characters.service';
import { GameMeta } from '../services/game-meta';
import { MetaChanges } from './command/meta-changes';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  meta: GameMeta[] = [];
  rounds = 0;

  constructor(private route: ActivatedRoute, private service: CharactersService) { }

  ngOnInit(): void {
    this.setup();
  }

  private setup(): void {
    const name1 = this.route.snapshot.paramMap.get('player1');
    const name2 = this.route.snapshot.paramMap.get('player2');

    this.service.getMeta(name1!)
      .pipe(
        tap(gm1 => this.meta.push(gm1))
      )
      .subscribe(_ => {
        this.service.getMeta(name2!)
          .pipe(
            tap(gm2 => this.meta.push(gm2))
          )
          .subscribe();
      });
  }

  processMetaChanges(metaChange: MetaChanges){
    let statsCount = metaChange.statChanges.length;
    for(let i = 0; i < statsCount; i++){
      this.meta[metaChange.gameMetaPosition].gameCharacter.stats[metaChange.statChanges[i][0]] = metaChange.statChanges[i][1];
      // console.log('stat: '+metaChange.statChanges[i][0])
      // console.log('value: '+metaChange.statChanges[i][1])

    }
    this.rounds++;
  }

}
