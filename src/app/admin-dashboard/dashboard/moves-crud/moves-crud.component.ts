import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin-services/admin.service';
import { MoveEntity } from '../../admin-services/move-entity';

@Component({
  selector: 'app-moves-crud',
  templateUrl: './moves-crud.component.html',
  styleUrls: ['./moves-crud.component.css']
})
export class MovesCrudComponent implements OnInit {

  moves: MoveEntity[] = [];
  movesForm = new FormArray([]);
  editable: boolean = false;

  get movesFormArray(): FormGroup[] {
    return this.movesForm.controls as FormGroup[];
  }

  constructor(private admin: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupMoves();
  }

  private setupMoves() {
    this.movesForm.clear();
    this.admin.serveMovesReadAll()
      .subscribe(resp => {
        this.moves = resp;
        this.populateMovesForm();
      });
  }

  private populateMovesForm() {
    for (let move of this.moves) {
      let moveGroup = new FormGroup({});
      for (let attr in move) {
        const value = move[attr as keyof MoveEntity];
        moveGroup.addControl(attr, new FormControl(value));
      }
      this.movesForm.push(moveGroup);
    }
  }

  saveAll() {
    let rawArray = this.movesForm.getRawValue();
    this.admin.serveMovesUpdateAll(rawArray)
      .subscribe(resp => this.moves = resp);

    this.editable = !this.editable;
  }

  newMove = this.fb.group({
    moveId: undefined,
    moveName: undefined,
    moveType: undefined,
    moveCategory: undefined,
    basePower: undefined,
    moveLimit: undefined,
    cost: undefined,
    priority: undefined,
    buffAmount1: undefined,
    buffAmount2: undefined,
    buffStat1: undefined,
    buffStat2: undefined,
    debuffAmount1: undefined,
    debuffAmount2: undefined,
    debuffStat1: undefined,
    debuffStat2: undefined,
  })

  toggleCreate() {
    let form = document.getElementById('createForm');
    let display = form!.style.display;
    form!.style.display = display === 'block' ? 'none' : 'block';
  }

  postMove() {
    this.admin.serveMovesCreate(this.newMove.getRawValue())
      .subscribe(
        _ => {
          let form = document.getElementById('createForm');
          form!.style.display = 'none';
          this.setupMoves();
          for(let attr in this.newMove.controls){
            this.newMove.get(attr)?.setValue(undefined);
          }
        }
      );
  }

  deleteMove(moveId: number) {
    this.admin.serveMovesDelete('' + moveId)
      .subscribe(_ => this.setupMoves());
  }

}
