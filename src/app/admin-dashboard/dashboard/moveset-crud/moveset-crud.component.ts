import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
  characters: MinCharacterEntity[] = [{'characterId': 0, 'name': 'Select One', 'clazz': ''}];
  formArray = new FormArray([]);
  editable = false;
  selectedCharacterId?: number;
  availableMoves: MoveEntity[] = [];
  currentMoves: MoveEntity[] = [];

  get formGroups(): FormGroup[] {
    return this.formArray.controls as FormGroup[];
  }

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
      .subscribe(resp => this.availableMoves = resp);
  }

  updateCharacterId(event: Event) {
    const idString = (event.target as HTMLSelectElement).value;
    this.selectedCharacterId = parseInt(idString);
    console.log('character id: ' + this.selectedCharacterId);
    this.updateCharacterMoves();
  }

  private updateCharacterMoves() {
    this.admin.serveMovesetsReadAll(this.selectedCharacterId)
      .pipe(
        // tap( ms => console.log(JSON.stringify(ms))),
        map((msArray) => {
          this.currentMoves = msArray.map(ms => ms.rpgMove);
        })
      )
      .subscribe(
        _ => console.log('Selected Moves: ' + this.currentMoves)
      );
  }


  private setupMovesets() {
    this.formArray.clear();
    this.admin.serveMovesetsReadAll()
      .subscribe(resp => {
        this.movesets = resp;
        this.populateFormGroups();
      })
  }

  private populateFormGroups() {
    for (let moveset of this.movesets) {
      let formGroup = new FormGroup({});
      for (let attr in moveset) {
        const value = moveset[attr as keyof MovesetEntity];
        formGroup.addControl(attr, new FormControl(value));
      }
      this.formArray.push(formGroup);
    }
  }


  // saveAll() {
  //   let rawArray = this.formArray.getRawValue();
  //   this.admin.serveMovesetsUpdateAll(rawArray)
  //     .subscribe(resp => this.movesets = resp);
  //   this.editable = !this.editable;
  // }

  // createForm = this.fb.group({
  //   movesetId: undefined,
  //   characterId: undefined,
  //   rpgMove: this.fb.group({
  //     moveId: undefined,
  //     moveName: undefined,
  //     moveType: undefined,
  //     moveCategory: undefined,
  //     basePower: undefined,
  //     moveLimit: undefined,
  //     cost: undefined,
  //     priority: undefined,
  //     buffAmount1: undefined,
  //     buffAmount2: undefined,
  //     buffStat1: undefined,
  //     buffStat2: undefined,
  //     debuffAmount1: undefined,
  //     debuffAmount2: undefined,
  //     debuffStat1: undefined,
  //     debuffStat2: undefined,
  //   }),
  //   isDefault: undefined,
  //   isUnlockable: undefined
  // })

  // toggleCreate() {
  //   let form = document.getElementById('createForm');
  //   let display = form!.style.display;
  //   form!.style.display = display === 'block' ? 'none' : 'block';
  // }

  // postMoveset(){
  //   this.admin.serveMovesetsCreate(this.createForm.getRawValue())
  //     .subscribe( _ => {
  //       let form = document.getElementById('createForm');
  //       form!.style.display = 'none';
  //       this.setupMovesets();
  //       for(let attr in this.createForm.controls){
  //         this.createForm.get(attr)?.setValue(undefined);
  //       }
  //     })
  // }

  // deleteMove(movesetId: number){
  //   this.admin.serveMovesetsDelete(''+movesetId)
  //     .subscribe( _ => this.setupMovesets());
  // }
}
