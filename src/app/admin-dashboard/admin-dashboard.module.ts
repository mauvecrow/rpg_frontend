import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MovesCrudComponent } from './dashboard/moves-crud/moves-crud.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MovesetCrudComponent } from './dashboard/moveset-crud/moveset-crud.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MovesCrudComponent,
    MovesetCrudComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminDashboardModule { }
