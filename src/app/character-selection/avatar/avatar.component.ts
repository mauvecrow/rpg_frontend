import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameCharacter } from 'src/app/services/game-character';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input()
  gameCharacter!: GameCharacter;

  imgSource!: string;
  
  @Output() gcEmitter = new EventEmitter<GameCharacter>();

  constructor() { }

  selectPlayer(){
    this.gcEmitter.emit(this.gameCharacter);
  }

  ngOnInit(): void {
    this.imgSource = 'data:image/png;base64,' + this.gameCharacter!.avatar;
  }

}
