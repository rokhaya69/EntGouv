import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IRessource, Ressource } from '../ressource.model';
import { RessourceService } from '../service/ressource.service';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { ApprenantService } from 'app/entities/apprenant/service/apprenant.service';
import { IGroupe } from 'app/entities/groupe/groupe.model';
import { GroupeService } from 'app/entities/groupe/service/groupe.service';
import { ICours } from 'app/entities/cours/cours.model';
import { CoursService } from 'app/entities/cours/service/cours.service';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { PersoAdminService } from 'app/entities/perso-admin/service/perso-admin.service';
import { TypeRessource } from 'app/entities/enumerations/type-ressource.model';

@Component({
  selector: 'jhi-ressource-update',
  templateUrl: './ressource-update.component.html',
})
export class RessourceUpdateComponent implements OnInit {
  isSaving = false;
  typeRessourceValues = Object.keys(TypeRessource);

  apprenantsSharedCollection: IApprenant[] = [];
  groupesSharedCollection: IGroupe[] = [];
  coursSharedCollection: ICours[] = [];
  persoAdminsSharedCollection: IPersoAdmin[] = [];

  editForm = this.fb.group({
    id: [],
    libelRessource: [null, [Validators.required]],
    typeRessource: [null, [Validators.required]],
    lienRessource: [null, [Validators.required]],
    dateMise: [],
    apprenant: [],
    groupe: [],
    cours: [],
    persoAdmin: [],
  });

  constructor(
    protected ressourceService: RessourceService,
    protected apprenantService: ApprenantService,
    protected groupeService: GroupeService,
    protected coursService: CoursService,
    protected persoAdminService: PersoAdminService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ressource }) => {
      if (ressource.id === undefined) {
        const today = dayjs().startOf('day');
        ressource.dateMise = today;
      }

      this.updateForm(ressource);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ressource = this.createFromForm();
    if (ressource.id !== undefined) {
      this.subscribeToSaveResponse(this.ressourceService.update(ressource));
    } else {
      this.subscribeToSaveResponse(this.ressourceService.create(ressource));
    }
  }

  trackApprenantById(index: number, item: IApprenant): number {
    return item.id!;
  }

  trackGroupeById(index: number, item: IGroupe): number {
    return item.id!;
  }

  trackCoursById(index: number, item: ICours): number {
    return item.id!;
  }

  trackPersoAdminById(index: number, item: IPersoAdmin): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRessource>>): void {
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

  protected updateForm(ressource: IRessource): void {
    this.editForm.patchValue({
      id: ressource.id,
      libelRessource: ressource.libelRessource,
      typeRessource: ressource.typeRessource,
      lienRessource: ressource.lienRessource,
      dateMise: ressource.dateMise ? ressource.dateMise.format(DATE_TIME_FORMAT) : null,
      apprenant: ressource.apprenant,
      groupe: ressource.groupe,
      cours: ressource.cours,
      persoAdmin: ressource.persoAdmin,
    });

    this.apprenantsSharedCollection = this.apprenantService.addApprenantToCollectionIfMissing(
      this.apprenantsSharedCollection,
      ressource.apprenant
    );
    this.groupesSharedCollection = this.groupeService.addGroupeToCollectionIfMissing(this.groupesSharedCollection, ressource.groupe);
    this.coursSharedCollection = this.coursService.addCoursToCollectionIfMissing(this.coursSharedCollection, ressource.cours);
    this.persoAdminsSharedCollection = this.persoAdminService.addPersoAdminToCollectionIfMissing(
      this.persoAdminsSharedCollection,
      ressource.persoAdmin
    );
  }

  protected loadRelationshipsOptions(): void {
    this.apprenantService
      .query()
      .pipe(map((res: HttpResponse<IApprenant[]>) => res.body ?? []))
      .pipe(
        map((apprenants: IApprenant[]) =>
          this.apprenantService.addApprenantToCollectionIfMissing(apprenants, this.editForm.get('apprenant')!.value)
        )
      )
      .subscribe((apprenants: IApprenant[]) => (this.apprenantsSharedCollection = apprenants));

    this.groupeService
      .query()
      .pipe(map((res: HttpResponse<IGroupe[]>) => res.body ?? []))
      .pipe(map((groupes: IGroupe[]) => this.groupeService.addGroupeToCollectionIfMissing(groupes, this.editForm.get('groupe')!.value)))
      .subscribe((groupes: IGroupe[]) => (this.groupesSharedCollection = groupes));

    this.coursService
      .query()
      .pipe(map((res: HttpResponse<ICours[]>) => res.body ?? []))
      .pipe(map((cours: ICours[]) => this.coursService.addCoursToCollectionIfMissing(cours, this.editForm.get('cours')!.value)))
      .subscribe((cours: ICours[]) => (this.coursSharedCollection = cours));

    this.persoAdminService
      .query()
      .pipe(map((res: HttpResponse<IPersoAdmin[]>) => res.body ?? []))
      .pipe(
        map((persoAdmins: IPersoAdmin[]) =>
          this.persoAdminService.addPersoAdminToCollectionIfMissing(persoAdmins, this.editForm.get('persoAdmin')!.value)
        )
      )
      .subscribe((persoAdmins: IPersoAdmin[]) => (this.persoAdminsSharedCollection = persoAdmins));
  }

  protected createFromForm(): IRessource {
    return {
      ...new Ressource(),
      id: this.editForm.get(['id'])!.value,
      libelRessource: this.editForm.get(['libelRessource'])!.value,
      typeRessource: this.editForm.get(['typeRessource'])!.value,
      lienRessource: this.editForm.get(['lienRessource'])!.value,
      dateMise: this.editForm.get(['dateMise'])!.value ? dayjs(this.editForm.get(['dateMise'])!.value, DATE_TIME_FORMAT) : undefined,
      apprenant: this.editForm.get(['apprenant'])!.value,
      groupe: this.editForm.get(['groupe'])!.value,
      cours: this.editForm.get(['cours'])!.value,
      persoAdmin: this.editForm.get(['persoAdmin'])!.value,
    };
  }
}
