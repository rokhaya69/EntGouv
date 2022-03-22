import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PersoAdminComponent } from './list/perso-admin.component';
import { PersoAdminDetailComponent } from './detail/perso-admin-detail.component';
import { PersoAdminUpdateComponent } from './update/perso-admin-update.component';
import { PersoAdminDeleteDialogComponent } from './delete/perso-admin-delete-dialog.component';
import { PersoAdminRoutingModule } from './route/perso-admin-routing.module';

@NgModule({
  imports: [SharedModule, PersoAdminRoutingModule],
  declarations: [PersoAdminComponent, PersoAdminDetailComponent, PersoAdminUpdateComponent, PersoAdminDeleteDialogComponent],
  entryComponents: [PersoAdminDeleteDialogComponent],
})
export class PersoAdminModule {}
