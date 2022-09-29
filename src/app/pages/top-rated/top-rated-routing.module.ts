import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateAgeUserGuard } from 'src/app/core/guards/validate-age-user.guard';
import { TopRatedComponent } from './top-rated.component';

const routes: Routes = [{ path: '', component: TopRatedComponent, canActivate: [ValidateAgeUserGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopRatedRoutingModule {
}
