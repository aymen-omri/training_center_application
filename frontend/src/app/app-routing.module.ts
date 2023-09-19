import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ParticipantListComponent } from './components/participant-list/participant-list.component';
import { FormerListComponent } from './components/former-list/former-list.component';
import { AddFormerComponent } from './components/add-former/add-former.component';
import { CycleListComponent } from './components/cycle-list/cycle-list.component';
import { AddCycleComponent } from './components/add-cycle/add-cycle.component';
import { RegisterParticipantComponent } from './components/register-participant/register-participant.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'part_list', component: ParticipantListComponent },
  { path: 'former_list', component: FormerListComponent },
  { path: 'add_former', component: AddFormerComponent },
  { path: 'cycle_list', component: CycleListComponent },
  { path: 'add_cycle', component: AddCycleComponent },
  { path: 'register_part', component: RegisterParticipantComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
