import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IInspection, Inspection } from '../inspection.model';
import { InspectionService } from '../service/inspection.service';
import { ICommune } from 'app/entities/commune/commune.model';
import { CommuneService } from 'app/entities/commune/service/commune.service';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { PersoAdminService } from 'app/entities/perso-admin/service/perso-admin.service';
import { TypeInspec } from 'app/entities/enumerations/type-inspec.model';

@Component({
  selector: 'jhi-inspection-update',
  templateUrl: './inspection-update.component.html',
})
export class InspectionUpdateComponent implements OnInit {
  isSaving = false;
  typeInspecValues = Object.keys(TypeInspec);

  communesCollection: ICommune[] = [];
  persoAdminsCollection: IPersoAdmin[] = [];

  editForm = this.fb.group({
    id: [],
    nomInspec: [null, [Validators.required]],
    typeInspec: [null, [Validators.required]],
    commune: [],
    persoAdmin: [],
  });

  constructor(
    protected inspectionService: InspectionService,
    protected communeService: CommuneService,
    protected persoAdminService: PersoAdminService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inspection }) => {
      this.updateForm(inspection);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inspection = this.createFromForm();
    if (inspection.id !== undefined) {
      this.subscribeToSaveResponse(this.inspectionService.update(inspection));
    } else {
      this.subscribeToSaveResponse(this.inspectionService.create(inspection));
    }
  }

  trackCommuneById(index: number, item: ICommune): number {
    return item.id!;
  }

  trackPersoAdminById(index: number, item: IPersoAdmin): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInspection>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(inspection: IInspection): void {
    this.editForm.patchValue({
      id: inspection.id,
      nomInspec: inspection.nomInspec,
      typeInspec: inspection.typeInspec,
      commune: inspection.commune,
      persoAdmin: inspection.persoAdmin,
    });

    this.communesCollection = this.communeService.addCommuneToCollectionIfMissing(this.communesCollection, inspection.commune);
    this.persoAdminsCollection = this.persoAdminService.addPersoAdminToCollectionIfMissing(
      this.persoAdminsCollection,
      inspection.persoAdmin
    );
  }

  protected loadRelationshipsOptions(): void {
    this.communeService
      .query({ filter: 'inspection-is-null' })
      .pipe(map((res: HttpResponse<ICommune[]>) => res.body ?? []))
      .pipe(
        map((communes: ICommune[]) => this.communeService.addCommuneToCollectionIfMissing(communes, this.editForm.get('commune')!.value))
      )
      .subscribe((communes: ICommune[]) => (this.communesCollection = communes));

    this.persoAdminService
      .query({ filter: 'inspection-is-null' })
      .pipe(map((res: HttpResponse<IPersoAdmin[]>) => res.body ?? []))
      .pipe(
        map((persoAdmins: IPersoAdmin[]) =>
          this.persoAdminService.addPersoAdminToCollectionIfMissing(persoAdmins, this.editForm.get('persoAdmin')!.value)
        )
      )
      .subscribe((persoAdmins: IPersoAdmin[]) => (this.persoAdminsCollection = persoAdmins));
  }

  protected createFromForm(): IInspection {
    return {
      ...new Inspection(),
      id: this.editForm.get(['id'])!.value,
      nomInspec: this.editForm.get(['nomInspec'])!.value,
      typeInspec: this.editForm.get(['typeInspec'])!.value,
      commune: this.editForm.get(['commune'])!.value,
      persoAdmin: this.editForm.get(['persoAdmin'])!.value,
    };
  }
}
