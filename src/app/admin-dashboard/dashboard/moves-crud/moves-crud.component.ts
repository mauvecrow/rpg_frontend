import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-moves-crud',
  templateUrl: './moves-crud.component.html',
  styleUrls: ['./moves-crud.component.css']
})
export class MovesCrudComponent implements OnInit {

  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.admin.serveMovesGet()
      .subscribe(resp => {
        this.moves = resp;
        this.populateMovesForm();
      });
  }

  moves: any = [];
  movesForm = new FormArray([]);
  editable: boolean = false;

  get movesFormArray(): FormGroup[] {
    return this.movesForm.controls as FormGroup[];
  }

  private populateMovesForm() {
    for (let move in this.moves) {
      let moveGroup = new FormGroup({});
      for (let attr in this.moves[move]) {
        moveGroup.addControl(attr, new FormControl(this.moves[move][attr]));
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

}
