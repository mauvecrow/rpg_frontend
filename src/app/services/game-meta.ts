import { GameCharacter } from "./game-character";
import { GameMove } from "./game-move";

export interface GameMeta {
    gameCharacter: GameCharacter,
    gameMoves: GameMove[];
}