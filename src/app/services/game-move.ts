export interface GameMove {
    moveName: string,
    category: string,
    type: string,
    basePower: number,
    cost: number,
    limit: number,
    priority: number,
    buffs: { [stat: string] : number},
    debuffs: { [stat: string] : number}
}