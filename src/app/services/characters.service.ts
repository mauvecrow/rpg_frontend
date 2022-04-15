import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameCharacter } from './game-character';
import { Observable } from 'rxjs';
import { GameMeta } from './game-meta';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<GameCharacter[]>{
    return this.http.get<GameCharacter[]>(getAllCharactersUrl);
  }

  getMeta(name: string): Observable<GameMeta>{
    return this.http.get<GameMeta>(getCharacterMeta + name);
  }

}

const getAllCharactersUrl: string = 'http://localhost:8080/characters/all';
const getCharacterMeta = 'http://localhost:8080/characters/';
