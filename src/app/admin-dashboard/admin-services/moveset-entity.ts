import { MoveEntity } from "./move-entity";

export interface MovesetEntity {
    movesetId?: number,
    characterId: number,
    rpgMove: MoveEntity,
    isDefault?: string,
    isUnlockable?: string
}