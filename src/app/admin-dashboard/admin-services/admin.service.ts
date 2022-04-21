import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  serveMovesGet(moveId?: string){
    const uri = moveId ? adminMovesUri + '/' + moveId : adminMovesUri;
    return this.http.get(uri);
  }

  serveMovesUpdateAll(moves: any[]){
    return this.http.put(adminMovesUri, moves);
  }
}

const adminMovesUri = 'http://localhost:8080/admin/moves';
