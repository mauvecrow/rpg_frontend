import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { tap } from 'rxjs';
import { BattleEngineService } from 'src/app/services/battle-engine.service';
import { GameMeta } from 'src/app/services/game-meta';
import { GameMove } from 'src/app/services/game-move';
import { PlayerState, TurnState } from 'src/app/services/turn-state';
import { MetaChanges } from './meta-changes';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {

  // ---------------------- START phase: basic setup -------------------------------
  @Input() meta: GameMeta[] = [];
  gameMoves: GameMove[] = [];
  get gc1() { return this.meta[0].gameCharacter; }
  get gc2() { return this.meta[1].gameCharacter; }

  menu: string[] = ['Combat', 'Magic', 'Cover']; // hardcoded for now, can be derived elsewhere in the future
  message: string = ''; // display message for various phases

  constructor(private engine: BattleEngineService) { }

  ngOnInit(): void {
    this.generateMessage();
  }

  // ---------------------- SELECTION phase: player1 picks a move -------------------------------
  menuChoice = -1; // default to -1 since non-negative numbers will represent a valid arary index value
  currentState?: TurnState;
  newState?: TurnState;

  /**
   * Upon picking a menu category, the moves with that category will be displayed.
   * If no moves meet the category (which is the case of index = -1), then no moves are displayed.
   * @param index the array index used to generate the options for the Menu. 
   */
  submitCategory(index: number) {
    this.menuChoice = index;
    this.gameMoves = this.meta[0].moves.filter(move => move.category === this.menu[index]);
  }

  /**
   * Process the player's move selection. The current state is defined upon selection.
   * The new state is also updated in the BattleEngine service's observable
   * @param move the selected move that player1 makes
   */
  submitTurn(move: GameMove) {
    let partial1 = this.buildPartialState(true);
    let playerState1 = { playerId: partial1.playerId, move: move, stats: partial1.stats };
    let partial2 = this.buildPartialState(false);
    let playerState2 = { playerId: partial2.playerId, move: this.pickRandomMoveAi(), stats: partial2.stats };
    let ts = { player1State: playerState1, player2State: playerState2, sequence: [] };

    this.currentState = ts;
    this.engine.processTurn(ts)
      .pipe(
        tap(ts => {
          this.newState = ts;
        })
      )
      .subscribe(_ => this.updatePhase()); //Angular will update UI with updatePhase(). very nice
  }

  // utility method to help build the pieces of a PlayerState object
  private buildPartialState(isPlayer1: boolean) {
    const player = isPlayer1 ? 'Player1-' + this.meta[0].gameCharacter.name : 'Player2-' + this.meta[1].gameCharacter.name;
    const stats = isPlayer1 ? this.meta[0].gameCharacter.stats : this.meta[1].gameCharacter.stats;
    return {
      playerId: player,
      stats: stats
    }
  }

  // utility to have the ai (player2) pick a move
  private pickRandomMoveAi() {
    let p2 = this.meta[1];
    let currentEnergy = p2.gameCharacter.stats['Energy'];
    let availableMoves = p2.moves.filter(move => move.cost <= currentEnergy);
    if(availableMoves.length > 0){
      let randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }
    else { // backup incase no available has been assigned
      return {
        moveName: 'Brink',
        category: 'Combat',
        type: 'Damage',
        basePower: 10,
        cost: -10,
        limit: 99,
        priority: 1,
        buffs: {},
        debuffs: {}
      }
    }
    
  }
  // ---------------------- PROCESS phase: determine the next sequence of actions -------------------------------

  first?: PlayerState;
  second?: PlayerState;
  @Output() metaChangesEmitter = new EventEmitter<MetaChanges>();

  private processStatChanges() {
    const p1CurrStats = this.currentState!.player1State.stats;
    const p1NewStats = this.newState!.player1State.stats;
    const p2CurrStats = this.currentState!.player2State.stats;
    const p2NewStats = this.newState!.player2State.stats;
    let statChanges1 = Object.create(p1CurrStats);
    let statChanges2 = Object.create(p2CurrStats);
    for (let stat in p1CurrStats) {//arbitrarily choose a stat object to ensure valid attributes
      statChanges1[stat] = p1NewStats[stat] - p1CurrStats[stat];
      statChanges2[stat] = p2NewStats[stat] - p2CurrStats[stat];
    }
    return [statChanges1, statChanges2];
  }

  private getPlayerState(playerId: string) {
    return this.isFirstPlayer(playerId) ?
      this.newState!.player1State : this.newState!.player2State;
  }

  private isFirstPlayer(playerId: string): boolean {
    return playerId === this.newState!.player1State.playerId;
  }

  // ---------------------- MOVE phases -------------------------------

  private determineAction(moveType: string) {
    switch (moveType) {
      case 'Damage':
        return 'attacks';
      case 'Block':
        return 'defends';
      case 'Buff':
        return 'powers up';
      case 'Debuff':
        return 'debilitates';
      default:
        return 'acts';
    }
  }

  private buildMetaChanges(playerId: string, statsArray: [string, number][]){
    let position = this.isFirstPlayer(playerId) ? 0 : 1;
    return {gameMetaPosition: position, statChanges: statsArray};
  }

  private filterStats(newStats: any, stats: string[]){
    return Object.entries(newStats)
      .filter( statArray => !stats.includes(statArray[0])) as [string, number][];
  }

  private captureStats(newStats: any, stats: string[]){
    return Object.entries(newStats)
      .filter( statArray => stats.includes(statArray[0])) as [string, number][];
  }
  // ---------------------- ANIMATE phases -------------------------------
  firstMove?: GameMove;
  secondMove?: GameMove;

  // ---------------------- CHECK phases -------------------------------

  // ---------------------- Battle Flow -------------------------------

  // intended phases to guide the flow of battle
  readonly phases = ['START', 'SELECTION', 'PROCESS', 'MOVE1', 'ANIMATE1', 'CHECK1', 'MOVE2', 'ANIMATE2', 'CHECK2'];
  round = 1; // battle rounds
  phaseIndex = 0;
  phase = this.phases[this.phaseIndex];

  updatePhase() {
    this.phaseIndex = (this.phaseIndex + 1) % this.phases.length;
    this.phase = this.phases[this.phaseIndex];
    this.generateMessage();
  }


  private generateMessage() {
    switch (this.phase) {
      case 'START':
        this.message = `Starting battle between ${this.gc1.name} and ${this.gc2.name}`;
        break;
      case 'SELECTION':
        this.message = 'Please select a move';
        break;
      case 'PROCESS':
        this.message = 'FIGHT!';
        // const [changes1, changes2] = this.processStatChanges();
        const battleOrder = this.newState!.sequence;
        this.first = this.getPlayerState(battleOrder[0]);
        this.second = this.getPlayerState(battleOrder[1]);
        // this.message = JSON.stringify(changes1) + '\n' + JSON.stringify(changes2);
        break;
      case 'MOVE1':
        this.firstMove = this.first!.move;
        let firstName = this.first!.playerId.slice(8);
        let action = this.determineAction(this.firstMove.type);
        this.message = `${firstName} ${action} with ${this.firstMove.moveName}!`;
        let updatedStats1 = this.captureStats(this.first!.stats, ['Energy']);
        let energyChange1 = this.buildMetaChanges(this.first!.playerId, updatedStats1);
        this.metaChangesEmitter.emit(energyChange1);
        break;
      case 'ANIMATE1':
        if( this.firstMove!.type === 'Block'){
          // no stat changes
          this.message = 'Guarding!'
        }
        else if ( this.firstMove!.type === 'Buff'){
          let updatedStats1 = this.filterStats(this.first!.stats, ['Health','Energy']);
          let statChange1 = this.buildMetaChanges(this.first!.playerId, updatedStats1);
          this.metaChangesEmitter.emit(statChange1);
          this.message = 'Buff!'
        }
        else if ( this.firstMove!.type === 'Damage'){ 
          let updatedStats2 = this.captureStats(this.second!.stats, ['Health']);
          let statChange2 = this.buildMetaChanges(this.second!.playerId, updatedStats2);
          this.metaChangesEmitter.emit(statChange2);
          this.message = 'take this!'
        }
        else { // Debuf
          let updatedStats2 = this.filterStats(this.second!.stats, ['Health','Energy']);
          let statChange2 = this.buildMetaChanges(this.second!.playerId, updatedStats2);
          this.metaChangesEmitter.emit(statChange2);
          this.message = 'take this!'
        }
        
        break;
      case 'CHECK1':
        break;
      case 'MOVE2':
        this.secondMove = this.second!.move;
        let secondName = this.second!.playerId.slice(8);
        let action2 = this.determineAction(this.secondMove.type);
        this.message = `${secondName} ${action2} with ${this.secondMove.moveName}!`;
        let updatedStats2 = this.captureStats(this.second!.stats, ['Energy']);
        let energyChanges2 = this.buildMetaChanges(this.second!.playerId, updatedStats2);
        this.metaChangesEmitter.emit(energyChanges2);
        break;
      case 'ANIMATE2':
        if( this.secondMove!.type === 'Block'){
          // no stat changes other than energy
          this.message = 'Guarding!'
        }
        else if ( this.secondMove!.type === 'Buff'){
          let updatedStats2 = this.filterStats(this.second!.stats, ['Health','Energy'])
          let statChange2 = this.buildMetaChanges(this.second!.playerId, updatedStats2);
          this.metaChangesEmitter.emit(statChange2);
          this.message = 'Buff!'
        }
        else if ( this.secondMove!.type === 'Damage'){
          let updatedStats1 = this.captureStats(this.first!.stats, ['Health']);
          let statChange1 = this.buildMetaChanges(this.first!.playerId, updatedStats1);
          this.metaChangesEmitter.emit(statChange1);
          this.message = 'take this!'
        }
        else { // Debuff
          let updatedStats1 = this.filterStats(this.first!.stats, ['Health','Energy']);
          let statChange1 = this.buildMetaChanges(this.first!.playerId, updatedStats1);
          this.metaChangesEmitter.emit(statChange1);
          this.message = 'get wrecked!'
        }

        break;
      case 'CHECK2':
        break;
    }
  }

  private updateMessage() {
    // determine order 
    let firstId = this.newState!.sequence[0];
    let secondId = this.newState!.sequence[1];
    // determine which gc is which player

    // apply stat changes based on first player's action
  }

  private extractGameCharacter(sequence: string[]) {

  }

  private processAction(player: PlayerState) {

  }





}
