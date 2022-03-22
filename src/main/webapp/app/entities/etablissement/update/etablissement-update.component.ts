import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEtablissement, Etablissement } from '../etablissement.model';
import { EtablissementService } from '../service/etablissement.service';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { PersoAdminService } from 'app/entities/perso-admin/service/perso-admin.service';
import { IRessource } from 'app/entities/ressource/ressource.model';
import { RessourceService } from 'app/entities/ressource/service/ressource.service';
import { IInspection } from 'app/entities/inspection/inspection.model';
import { InspectionService } from 'app/entities/inspection/service/inspection.service';
import { TypeEtab } from 'app/entities/enumerations/type-etab.model';

@Component({
  selector: 'jhi-etablissement-update',
  templateUrl: './etablissement-update.component.html',
})
export class EtablissementUpdateComponent implements OnInit {
  isSaving = false;
  typeEtabValues = Object.keys(TypeEtab);

  persoAdminsCollection: IPersoAdmin[] = [];
  ressourcesSharedCollection: IRessource[] = [];
  inspectionsSharedCollection: IInspection[] = [];

  editForm = this.fb.group({
    id: [],
    nomEtab: [null, [Validators.required]],
    typeEtab: [null, [Validators.required]],
    persoAdmin: [],
    ressources: [],
    inspection: [],
  });

  constructor(
    protected etablissementService: EtablissementService,
    protected persoAdminService: PersoAdminService,
    protected ressourceService: RessourceService,
    protected inspectionService: InspectionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etablissement }) => {
      this.updateForm(etablissement);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etablissement = this.createFromForm();
    if (etablissement.id !== undefined) {
      this.subscribeToSaveResponse(this.etablissementService.update(etablissement));
    } else {
      this.subscribeToSaveResponse(this.etablissementService.create(etablissement));
    }
  }

  trackPersoAdminById(index: number, item: IPersoAdmin): number {
    return item.id!;
  }

  trackRessourceById(index: number, item: IRessource): number {
    return item.id!;
  }

  trackInspectionById(index: number, item: IInspection): number {
    return item.id!;
  }

  getSelectedRessource(option: IRessource, selectedVals?: IRessource[]): IRessource {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtablissement>>): void {
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

  protected updateForm(etablissement: IEtablissement): void {
    this.editForm.patchValue({
      id: etablissement.id,
      nomEtab: etablissement.nomEtab,
      typeEtab: etablissement.typeEtab,
      persoAdmin: etablissement.persoAdmin,
      ressources: etablissement.ressources,
      inspection: etablissement.inspection,
    });

    this.persoAdminsCollection = this.persoAdminService.addPersoAdminToCollectionIfMissing(
      this.persoAdminsCollection,
      etablissement.persoAdmin
    );
    this.ressourcesSharedCollection = this.ressourceService.addRessourceToCollectionIfMissing(
      this.ressourcesSharedCollection,
      ...(etablissement.ressources ?? [])
    );
    this.inspectionsSharedCollection = this.inspectionService.addInspectionToCollectionIfMissing(
      this.inspectionsSharedCollection,
      etablissement.inspection
    );
  }

  protected loadRelationshipsOptions(): void {
    this.persoAdminService
      .query({ filter: 'etablissement-is-null' })
      .pipe(map((res: HttpResponse<IPersoAdmin[]>) => res.body ?? []))
      .pipe(
        map((persoAdmins: IPersoAdmin[]) =>
          this.persoAdminService.addPersoAdminToCollectionIfMissing(persoAdmins, this.editForm.get('persoAdmin')!.value)
        )
      )
      .subscribe((persoAdmins: IPersoAdmin[]) => (this.persoAdminsCollection = persoAdmins));

    this.ressourceService
      .query()
      .pipe(map((res: HttpResponse<IRessource[]>) => res.body ?? []))
      .pipe(
        map((ressources: IRessource[]) =>
          this.ressourceService.addRessourceToCollectionIfMissing(ressources, ...(this.editForm.get('ressources')!.value ?? []))
        )
      )
      .subscribe((ressources: IRessource[]) => (this.ressourcesSharedCollection = ressources));

    this.inspectionService
      .query()
      .pipe(map((res: HttpResponse<IInspection[]>) => res.body ?? []))
      .pipe(
        map((inspections: IInspection[]) =>
          this.inspectionService.addInspectionToCollectionIfMissing(inspections, this.editForm.get('inspection')!.value)
        )
      )
      .subscribe((inspections: IInspection[]) => (this.inspectionsSharedCollection = inspections));
  }

  protected createFromForm(): IEtablissement {
    return {
      ...new Etablissement(),
      id: this.editForm.get(['id'])!.value,
      nomEtab: this.editForm.get(['nomEtab'])!.value,
      typeEtab: this.editForm.get(['typeEtab'])!.value,
      persoAdmin: this.editForm.get(['persoAdmin'])!.value,
      ressources: this.editForm.get(['ressources'])!.value,
      inspection: this.editForm.get(['inspection'])!.value,
    };
  }
}
