import { GameMove } from "./game-move";

export interface TurnState {
    player1State: PlayerState,
    player2State: PlayerState,
    sequence: string[]
}

export interface PlayerState {
    playerId: string,
    move: GameMove,
    stats: {[stat: string]: number}
}