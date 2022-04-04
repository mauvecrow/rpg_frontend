export interface GameCharacter {
    name: String,
    characterClass: String,
    avatar: any, // byte[] in java, but unsure for TypeScript + JSON
    profile: any, //same as above
    stats: {stat: number}
}

