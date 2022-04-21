import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const adminRoutes: Routes = [
  {path: 'admin', component: DashboardComponent}
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
