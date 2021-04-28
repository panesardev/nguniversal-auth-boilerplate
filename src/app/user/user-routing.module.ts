import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadUserGuard } from './user-preload.guard';

import { UserComponent } from './user.component';

const routes: Routes = [
  { path: ':username', component: UserComponent, resolve: [PreloadUserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
