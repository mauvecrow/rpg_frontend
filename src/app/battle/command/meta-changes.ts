export interface MetaChanges {
    gameMetaPosition: number, // should be only 0 or 1 since GameMeta only has 2 GameCharacters
    statChanges: [string, number][] // array of [k,v] where k = stat, v = stat value. mimics return of Object.entries
}