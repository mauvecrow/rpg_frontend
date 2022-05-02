import { Component, OnInit, Input } from '@angular/core';
import { BattleEngineService } from 'src/app/services/battle-engine.service';
import { GameMeta } from 'src/app/services/game-meta';
import { GameMove } from 'src/app/services/game-move';
import { PlayerState, TurnState } from 'src/app/services/turn-state';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {

  @Input() meta!: GameMeta[];
  gameMoves: GameMove[] = [];

  menu: string[] = ['Combat', 'Magic', 'Cover', 'Back'];

  resultState?: string;

  constructor(private engine: BattleEngineService) { }

  ngOnInit(): void {
    this.gameMoves = this.meta[0].moves;
  }

  submitTurn(move: GameMove)  {
    let partial1 = this.generatePlayerState(true);
    let player1 = {playerId: partial1.playerId, move: move, stats: partial1.stats};
    let partial2 = this.generatePlayerState(false);
    let player2 = {playerId: partial2.playerId, move: this.pickRandomMoveAi(), stats: partial2.stats};
    let ts = {player1State: player1, player2State: player2, sequence: []};
    // console.log('Current Turn State: \n' + JSON.stringify(ts));
    this.engine.processTurn(ts)
      .subscribe( ts => this.resultState = JSON.stringify(ts));
  }

  private generatePlayerState(isPlayer1: boolean){
    const player = isPlayer1 ? 'Player1-' + this.meta[0].gameCharacter.name : 'Player2-'+ this.meta[1].gameCharacter.name;
    const stats = isPlayer1 ? this.meta[0].gameCharacter.stats : this.meta[1].gameCharacter.stats;
    return {
      playerId: player,
      stats: stats
    }
  }

  private pickRandomMoveAi(){
    let p2 = this.meta[1];
    let currentEnergy = p2.gameCharacter.stats['Energy'];
    let availableMoves = p2.moves.filter( move => move.cost <= currentEnergy);
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }
}
