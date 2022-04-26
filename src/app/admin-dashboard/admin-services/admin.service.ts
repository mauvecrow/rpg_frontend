import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoveEntity } from './move-entity';
import { Observable } from 'rxjs';
import { MovesetEntity } from './moveset-entity';
import { CharacterEntity, MinCharacterEntity } from './character-entity';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // ----------------------        Moves Crud         -------------------

  serveMovesReadAll(): Observable<MoveEntity[]> {
    return this.http.get<MoveEntity[]>(movesUri);
  }

  serveMovesUpdateAll(moves: MoveEntity[]): Observable<MoveEntity[]> {
    return this.http.put<MoveEntity[]>(movesUri, moves);
  }
  
  serveMovesCreate(move: MoveEntity): Observable<MoveEntity> {
    return this.http.post<MoveEntity>(movesUri, move);
  }

  serveMovesRead(moveId: string): Observable<MoveEntity> {
    const uri = movesUri + '/' + moveId;
    return this.http.get<MoveEntity>(uri);
  }

  serveMovesUpdate(moveId: string, move: MoveEntity): Observable<MoveEntity> {
    const uri = movesUri + '/' + moveId;
    return this.http.put<MoveEntity>(uri, move);
  }

  serveMovesDelete(moveId: string) {
    const uri = movesUri + '/' + moveId;
    return this.http.delete(uri);
  }

  // ----------------------        Moveset Crud         -------------------

  serveMovesetsReadAll(characterId?: number) {
    if(!characterId)
      return this.http.get<MovesetEntity[]>(movesetsUri);
    else {
      const uri = movesetsUri + '?characterId=' + characterId;
      return this.http.get<MovesetEntity[]>(uri);
    }
  }

  serveMovesetsUpdateAll(movesets: MovesetEntity[]){
    return this.http.put<MovesetEntity[]>(movesetsUri, movesets);
  }

  serveMovesetsCreate(moveset: MovesetEntity){
    return this.http.post<MovesetEntity>(movesetsUri, moveset);
  }

  serveMovesetsRead(movesetId: string){
    const uri = movesetsUri + '/' + movesetId;
    return this.http.get<MovesetEntity>(uri);
  }

  serveMovesetsUpdate(movesetId: string, moveset: MovesetEntity){
    const uri = movesetsUri + '/' + movesetId;
    return this.http.put<MovesetEntity>(uri, moveset);
  }

  serveMovesetsDelete(movesetId: string){
    const uri = movesetsUri + '/' + movesetId;
    return this.http.delete(uri);
  }

  // ----------------------        Characters Crud         -------------------

  serveCharactersReadAll(){
    return this.http.get<CharacterEntity[]>(charactersUri);
  }

  serveMinCharactersReadAll(){
    const uri = charactersUri + '/min';
    return this.http.get<MinCharacterEntity[]>(uri);
  }

  serveCharactersUpdateAll(characters: CharacterEntity[]){
    return this.http.put<CharacterEntity[]>(charactersUri, characters);
  }

  serveCharactersCreate(character: CharacterEntity){
    return this.http.post<CharacterEntity>(charactersUri, character);
  }

  serveCharactersRead(characterId: string){
    const uri = charactersUri + '/' + characterId;
    return this.http.get<CharacterEntity>(uri);
  }

  serveCharactersUpdate(characterId: string, character: CharacterEntity){
    const uri = charactersUri + '/' + characterId;
    return this.http.put<CharacterEntity>(uri, character);
  }

  serveCharactersDelete(characterId: string){
    const uri = charactersUri + '/' + characterId;
    return this.http.delete(uri);
  }
}

const movesUri = 'http://localhost:8080/admin/moves';
const movesetsUri = 'http://localhost:8080/admin/movesets';
const charactersUri = 'http://localhost:8080/admin/characters';
