import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoveEntity } from './move-entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // ----------------------        Moves Crud         -------------------

  serveMovesReadAll(): Observable<MoveEntity[]> {
    return this.http.get<MoveEntity[]>(adminMovesUri);
  }

  serveMovesUpdateAll(moves: MoveEntity[]): Observable<MoveEntity[]> {
    return this.http.put<MoveEntity[]>(adminMovesUri, moves);
  }
  
  serveMovesCreate(move: MoveEntity): Observable<MoveEntity> {
    return this.http.post<MoveEntity>(adminMovesUri, move);
  }

  serveMovesRead(moveId: string): Observable<MoveEntity> {
    const uri = adminMovesUri + '/' + moveId;
    return this.http.get<MoveEntity>(uri);
  }

  serveMovesUpdate(moveId: string, move: MoveEntity): Observable<MoveEntity> {
    const uri = adminMovesUri + '/' + moveId;
    return this.http.put<MoveEntity>(uri, move);
  }

  serveMovesDelete(moveId: string): Observable<MoveEntity> {
    const uri = adminMovesUri + '/' + moveId;
    return this.http.delete<MoveEntity>(uri);
  }

  // ----------------------        Moveset Crud         -------------------

  serveMovesetReadAll() {
    return this.http.get(adminMovesetUri);
  }
}

const adminMovesUri = 'http://localhost:8080/admin/moves';
const adminMovesetUri = 'http://localhost:8080/admin/moveset';
