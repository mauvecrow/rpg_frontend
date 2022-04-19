import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../services/characters.service';
import { GameMeta } from '../services/game-meta';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  meta1?: GameMeta;
  meta2?: GameMeta;

  constructor(private route: ActivatedRoute, private service: CharactersService) { }

  ngOnInit(): void {
    this.setup();
  }

  private setup(): void {
    const name1 = this.route.snapshot.paramMap.get('player1');
    const name2 = this.route.snapshot.paramMap.get('player2');

    this.service.getMeta(name1!).subscribe( gm => this.meta1 = gm);
    this.service.getMeta(name2!).subscribe( gm => this.meta2 = gm);
  }

}
