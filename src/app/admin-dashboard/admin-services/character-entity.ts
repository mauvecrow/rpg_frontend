export interface CharacterEntity {
    characterId: number,
    name: string,
    clazz: string,
    avatar: string,
    profile: string,
    creationDate: Date,
    createdBy: string,
    lastUpdateDate: Date,
    lastUpdatedBy: string
}

export interface MinCharacterEntity {
    characterId: number,
    name: string,
    clazz: string,
}