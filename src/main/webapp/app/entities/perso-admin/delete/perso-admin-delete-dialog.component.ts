import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersoAdmin } from '../perso-admin.model';
import { PersoAdminService } from '../service/perso-admin.service';

@Component({
  templateUrl: './perso-admin-delete-dialog.component.html',
})
export class PersoAdminDeleteDialogComponent {
  persoAdmin?: IPersoAdmin;

  constructor(protected persoAdminService: PersoAdminService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.persoAdminService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
