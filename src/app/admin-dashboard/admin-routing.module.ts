import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const adminRoutes: Routes = [

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
