import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs';
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

  @Input() meta: GameMeta[] = [];
  gameMoves: GameMove[] = [];
  get gc1() { return this.meta[0].gameCharacter; }
  get gc2() { return this.meta[1].gameCharacter; }

  menu: string[] = ['Combat', 'Magic', 'Cover'];
  menuChoice = -1;

  currentState?: TurnState;
  newState?: TurnState;
  message: string = '';

  constructor(private engine: BattleEngineService) { }

  ngOnInit(): void {
    // this.gameMoves = this.meta[0].moves;
  }

  submitTurn(move: GameMove) {
    let partial1 = this.generatePlayerState(true);
    let player1 = { playerId: partial1.playerId, move: move, stats: partial1.stats };
    let partial2 = this.generatePlayerState(false);
    let player2 = { playerId: partial2.playerId, move: this.pickRandomMoveAi(), stats: partial2.stats };
    let ts = { player1State: player1, player2State: player2, sequence: [] };
    // console.log('Current Turn State: \n' + JSON.stringify(ts));
    this.currentState = ts;
    this.engine.processTurn(ts)
      .pipe(
        tap(ts => {
          this.newState = ts;
          this.generateMessage('MOVE1'); // test phase and message
        })
      )
      .subscribe();


  }

  private generatePlayerState(isPlayer1: boolean) {
    const player = isPlayer1 ? 'Player1-' + this.meta[0].gameCharacter.name : 'Player2-' + this.meta[1].gameCharacter.name;
    const stats = isPlayer1 ? this.meta[0].gameCharacter.stats : this.meta[1].gameCharacter.stats;
    return {
      playerId: player,
      stats: stats
    }
  }

  private pickRandomMoveAi() {
    let p2 = this.meta[1];
    let currentEnergy = p2.gameCharacter.stats['Energy'];
    let availableMoves = p2.moves.filter(move => move.cost <= currentEnergy);
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  submitCategory(index: number){
    this.menuChoice = index;
    this.gameMoves = this.meta[0].moves.filter( move => move.category === this.menu[index]);
  }

  // ------------------------------- message generator ----------------------------------

  readonly phases = ['START', 'MOVE1', 'UPDATE1', 'MOVE2', 'UPDATE2', 'SUMMARY'];

  private generateMessage(phase?: string) {
    switch (phase) {
      case 'START':
        this.message = this.startMessage();
        break;
      case 'MOVE1':
        let firstId = this.newState!.sequence[0];
        const [changes1, changes2] = this.processStatChanges();
        this.message = JSON.stringify(changes1) + '\n' + JSON.stringify(changes2);
        break;
    }
    console.log(this.message);
  }

  private startMessage() {
    return `Starting battle between ${this.gc1.name} and ${this.gc2.name}`;
  }

  private updateMessage() {
    // determine order 
    let firstId = this.newState!.sequence[0];
    let secondId = this.newState!.sequence[1];
    // determine which gc is which player

    // apply stat changes based on first player's action
  }

  private extractGameCharacter(sequence: string[]){
    
  }

  private processAction(player: PlayerState) {

  }

  private processStatChanges() {
    const p1CurrStats = this.currentState!.player1State.stats;
    const p1NewStats = this.newState!.player1State.stats;
    const p2CurrStats = this.currentState!.player2State.stats;
    const p2NewStats = this.newState!.player2State.stats;
    let statChanges1 = Object.create(p1CurrStats);
    let statChanges2 = Object.create(p2CurrStats);
    for(let stat in p1CurrStats) {//arbitrarily choose a stat object
      statChanges1[stat] = p1NewStats[stat] - p1CurrStats[stat];
      statChanges2[stat] = p2NewStats[stat] - p2CurrStats[stat];
    }
    return [statChanges1, statChanges2];
  }




}
