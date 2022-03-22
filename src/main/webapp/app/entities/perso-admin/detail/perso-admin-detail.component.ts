import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersoAdmin } from '../perso-admin.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-perso-admin-detail',
  templateUrl: './perso-admin-detail.component.html',
})
export class PersoAdminDetailComponent implements OnInit {
  persoAdmin: IPersoAdmin | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ persoAdmin }) => {
      this.persoAdmin = persoAdmin;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
