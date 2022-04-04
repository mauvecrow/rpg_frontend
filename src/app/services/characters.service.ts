import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameCharacter } from './game-character';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<GameCharacter[]>{
    return this.http.get<GameCharacter[]>(getAllCharactersUrl);
  }

}

const getAllCharactersUrl: string = 'http://localhost:8080/characters/all';
