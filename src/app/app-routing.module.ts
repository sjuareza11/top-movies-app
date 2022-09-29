import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', redirectTo: 'top-rated', pathMatch: 'full' },
{ path: 'top-rated', loadChildren: () => import('./pages/top-rated/top-rated.module').then(m => m.TopRatedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
