import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { AdminService } from '../../admin-services/admin.service';
import { MinCharacterEntity } from '../../admin-services/character-entity';
import { MoveEntity } from '../../admin-services/move-entity';
import { MovesetEntity } from '../../admin-services/moveset-entity';

@Component({
  selector: 'app-moveset-crud',
  templateUrl: './moveset-crud.component.html',
  styleUrls: ['./moveset-crud.component.css']
})
export class MovesetCrudComponent implements OnInit {

  movesets: MovesetEntity[] = [];
  characters: MinCharacterEntity[] = [{ 'characterId': -1, 'name': 'Select One', 'clazz': '' }];

  editable = false;
  selectedCharacterId: number = -1;
  allMoves: MoveEntity[] = [];
  availableMoves: MoveEntity[] = [];
  currentMoves: MoveEntity[] = [];

  constructor(private admin: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCharacters();
    this.getAvailableMoves();
  }

  // this method is used to populate the Select element's options
  private getCharacters() {
    this.admin.serveMinCharactersReadAll()
      .subscribe(resp => this.characters.push(...resp));
  }

  private getAvailableMoves() {
    this.admin.serveMovesReadAll()
      .pipe(
        tap(moves => {
          this.allMoves = moves;
          this.availableMoves = this.allMoves;
          this.generateFormGroups();
        })
      )
      .subscribe();
  }

  // method to be called for onChange event from select element
  updateCharacterId(event: Event) {
    const idString = (event.target as HTMLSelectElement).value;
    this.selectedCharacterId = parseInt(idString);
    console.log('character id: ' + this.selectedCharacterId);
    this.updateCharacterMoves();
  }

  private updateCharacterMoves() {
    this.admin.serveMovesetsReadAll(this.selectedCharacterId)
      .pipe(
        map(
          msArray => this.currentMoves = msArray.map(ms => ms.rpgMove)
        ),
        tap(
          _ => {
            let ids = this.currentMoves.map(m => m.moveId);
            this.availableMoves = this.allMoves.filter(move => !ids.includes(move.moveId));
            this.generateFormGroups();
          }
        )
      )
      .subscribe();
  }

  // fields and methods for FORM actions

  availableMovesFormGroup = new FormGroup({});
  currentMovesFormGroup = new FormGroup({});
  addingList: string[] = [];


  private generateFormGroups() {
    this.availableMovesFormGroup = new FormGroup({} /*, this.validateGroup()*/);
    this.currentMovesFormGroup = new FormGroup({});
    this.availableMoves.forEach(
      move => this.availableMovesFormGroup.addControl(move.moveName, new FormControl())
    );

    // console.log('form1: ' + JSON.stringify(this.availableMovesFormGroup.getRawValue()) );

    // this.currentMoves.forEach(
    //   move => this.currentMovesFormGroup.addControl(move.moveName, new FormControl(move))
    // );
  }

  addMoves() {
    const form = document.querySelector('#available-form');
    const inputs = form?.querySelectorAll('input');
    let ids: string[] = [];
    inputs?.forEach((input) => { if (input.checked) { ids.push(input.value) } })

    for (let i = 0; i < ids.length; i++) {
      const index = this.allMoves.findIndex(move => move.moveId == parseInt(ids[i]));
      const rpgMove = this.allMoves[index];
      const newMoveset: MovesetEntity = {
        movesetId: undefined,
        characterId: this.selectedCharacterId,
        rpgMove: rpgMove,
        isDefault: undefined,
        isUnlockable: undefined
      }
      this.admin.serveMovesetsCreate(newMoveset).subscribe(_ => {
        if (i == ids.length - 1) { //update on the last POST call
          this.updateCharacterMoves();
        }
      })
    }
  }


  // validators

  /*
  Observations with validator at FormGroup:
  1 - the form validates itself every time the group is referneced. This includes the process of adding control
  2 - after all controls are added, it appears the form validates its state once for every state
  3 - summary, if there are 14 moves, the form group will call the validation 28 times initially
  
  private validateGroup(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // this.checkValidity();
      console.log('control value: ' + JSON.stringify(control.value));
      const test = (this.selectedCharacterId > 0 && this.addingList.length > 0);
      console.log('test: ' + (this.selectedCharacterId > 0) + ' && ' + (this.addingList.length))
      return test ? null : { insufficientSelection: 'Ensure a character is selected and/or moves are selected' };
    }
  }
  */

  get readyToAdd(): boolean {
    this.checkValidity();
    const test = (this.selectedCharacterId > 0 && this.addingList.length > 0);
    return test;
  }

  private checkValidity() {
    this.addingList = [];
    const formValue = this.availableMovesFormGroup.value;
    // console.log(formValue);
    for (let moveName in formValue) {
      if (formValue[moveName]) {
        this.addingList.push(moveName);
      }
    }
    // console.log('adding lsit: ' + this.addingList) //this gets called a lot by angular for whatever reason
  }

}
