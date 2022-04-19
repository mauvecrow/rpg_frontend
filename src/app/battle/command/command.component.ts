import { Component, OnInit, Input } from '@angular/core';
import { GameMove } from 'src/app/services/game-move';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {

  @Input() gameMoves!: GameMove[];

  menu: string[] = ['Combat', 'Magic', 'Guard', 'Back'];

  constructor() { }

  ngOnInit(): void {
    // this.generateMenu();
  }

  // private generateMenu(){
  //   this.menu = this.gameMoves.map( (gameMove, index, array) => gameMove.category)
  // }

}
