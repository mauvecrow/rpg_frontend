import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovesCrudComponent } from './dashboard/moves-crud/moves-crud.component';
import { MovesetCrudComponent } from './dashboard/moveset-crud/moveset-crud.component';

const adminRoutes: Routes = [
  {
    path: 'admin', 
    component: DashboardComponent,
    children: [
      {
        path: 'moves',
        component: MovesCrudComponent
      },
      {
        path: 'moveset',
        component: MovesetCrudComponent
      },
    ]}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AdminRoutingModule { }
