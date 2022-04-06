export interface GameCharacter {
    name: string,
    characterClass: string,
    avatar: any, // byte[] in java, but unsure for TypeScript + JSON
    profile: any, //same as above
    stats: {[stat: string]: number}
}