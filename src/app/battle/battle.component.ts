import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { CharactersService } from '../services/characters.service';
import { GameMeta } from '../services/game-meta';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  meta: GameMeta[] = [];

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

}
