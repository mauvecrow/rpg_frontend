import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameCharacter } from 'src/app/services/game-character';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  readonly statNames = ['Force','Focus','Spirit','Reflex','Evasion','Agility'];
  imgSource: string | undefined;

  @Input() player: GameCharacter | undefined | null;
  @Output() playerEmitter = new EventEmitter<GameCharacter>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    if(this.player){
      this.imgSource = 'data:image/png;base64,' + this.player.profile;
    }
    
  }

  selectPlayer(){
    if(this.player != null){
      this.playerEmitter.emit(this.player);
    }
  }

}
