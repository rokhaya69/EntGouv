import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPersoAdmin, PersoAdmin } from '../perso-admin.model';
import { PersoAdminService } from '../service/perso-admin.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IEvaluation } from 'app/entities/evaluation/evaluation.model';
import { EvaluationService } from 'app/entities/evaluation/service/evaluation.service';
import { IPoste } from 'app/entities/poste/poste.model';
import { PosteService } from 'app/entities/poste/service/poste.service';
import { Sexe } from 'app/entities/enumerations/sexe.model';

@Component({
  selector: 'jhi-perso-admin-update',
  templateUrl: './perso-admin-update.component.html',
})
export class PersoAdminUpdateComponent implements OnInit {
  isSaving = false;
  sexeValues = Object.keys(Sexe);

  usersSharedCollection: IUser[] = [];
  evaluationsSharedCollection: IEvaluation[] = [];
  postesSharedCollection: IPoste[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    email: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    telephone: [null, [Validators.required]],
    sexe: [null, [Validators.required]],
    photo: [],
    photoContentType: [],
    user: [],
    evaluations: [],
    poste: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected persoAdminService: PersoAdminService,
    protected userService: UserService,
    protected evaluationService: EvaluationService,
    protected posteService: PosteService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ persoAdmin }) => {
      this.updateForm(persoAdmin);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('entMefpaiApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const persoAdmin = this.createFromForm();
    if (persoAdmin.id !== undefined) {
      this.subscribeToSaveResponse(this.persoAdminService.update(persoAdmin));
    } else {
      this.subscribeToSaveResponse(this.persoAdminService.create(persoAdmin));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackEvaluationById(index: number, item: IEvaluation): number {
    return item.id!;
  }

  trackPosteById(index: number, item: IPoste): number {
    return item.id!;
  }

  getSelectedEvaluation(option: IEvaluation, selectedVals?: IEvaluation[]): IEvaluation {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersoAdmin>>): void {
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

  protected updateForm(persoAdmin: IPersoAdmin): void {
    this.editForm.patchValue({
      id: persoAdmin.id,
      nom: persoAdmin.nom,
      prenom: persoAdmin.prenom,
      email: persoAdmin.email,
      adresse: persoAdmin.adresse,
      telephone: persoAdmin.telephone,
      sexe: persoAdmin.sexe,
      photo: persoAdmin.photo,
      photoContentType: persoAdmin.photoContentType,
      user: persoAdmin.user,
      evaluations: persoAdmin.evaluations,
      poste: persoAdmin.poste,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, persoAdmin.user);
    this.evaluationsSharedCollection = this.evaluationService.addEvaluationToCollectionIfMissing(
      this.evaluationsSharedCollection,
      ...(persoAdmin.evaluations ?? [])
    );
    this.postesSharedCollection = this.posteService.addPosteToCollectionIfMissing(this.postesSharedCollection, persoAdmin.poste);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.evaluationService
      .query()
      .pipe(map((res: HttpResponse<IEvaluation[]>) => res.body ?? []))
      .pipe(
        map((evaluations: IEvaluation[]) =>
          this.evaluationService.addEvaluationToCollectionIfMissing(evaluations, ...(this.editForm.get('evaluations')!.value ?? []))
        )
      )
      .subscribe((evaluations: IEvaluation[]) => (this.evaluationsSharedCollection = evaluations));

    this.posteService
      .query()
      .pipe(map((res: HttpResponse<IPoste[]>) => res.body ?? []))
      .pipe(map((postes: IPoste[]) => this.posteService.addPosteToCollectionIfMissing(postes, this.editForm.get('poste')!.value)))
      .subscribe((postes: IPoste[]) => (this.postesSharedCollection = postes));
  }

  protected createFromForm(): IPersoAdmin {
    return {
      ...new PersoAdmin(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      email: this.editForm.get(['email'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      photoContentType: this.editForm.get(['photoContentType'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      user: this.editForm.get(['user'])!.value,
      evaluations: this.editForm.get(['evaluations'])!.value,
      poste: this.editForm.get(['poste'])!.value,
    };
  }
}
