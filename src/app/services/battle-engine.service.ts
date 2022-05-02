import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurnState } from './turn-state';

@Injectable({
  providedIn: 'root'
})
export class BattleEngineService {

  constructor(private http: HttpClient) { }

  processTurn(turn: TurnState) {
    return this.http.post<TurnState>(turnServiceUri, turn);
  }
}

const turnServiceUri = 'http://localhost:8180/engine/turn';
