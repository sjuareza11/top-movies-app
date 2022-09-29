import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { CircleProgressBarComponent } from './components/circle-progress-bar/circle-progress-bar.component';
import { UserAgeDialogComponent } from './components/dialogs/user-age-dialog/user-age-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
  declarations: [
    MovieCardComponent,
    HeaderComponent,
    UserAgeDialogComponent,
    CircleProgressBarComponent,
    CertificationsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  exports: [
    MovieCardComponent,
    HeaderComponent,
    UserAgeDialogComponent,
    NgbModule,
    CircleProgressBarComponent,
    CertificationsComponent
  ],
  entryComponents: [UserAgeDialogComponent]
})
export class SharedModule {
}
