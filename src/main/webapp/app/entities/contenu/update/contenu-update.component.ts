import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IContenu, Contenu } from '../contenu.model';
import { ContenuService } from '../service/contenu.service';
import { ISeance } from 'app/entities/seance/seance.model';
import { SeanceService } from 'app/entities/seance/service/seance.service';

@Component({
  selector: 'jhi-contenu-update',
  templateUrl: './contenu-update.component.html',
})
export class ContenuUpdateComponent implements OnInit {
  isSaving = false;

  seancesCollection: ISeance[] = [];

  editForm = this.fb.group({
    id: [],
    contenu: [null, [Validators.required]],
    seance: [],
  });

  constructor(
    protected contenuService: ContenuService,
    protected seanceService: SeanceService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contenu }) => {
      this.updateForm(contenu);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contenu = this.createFromForm();
    if (contenu.id !== undefined) {
      this.subscribeToSaveResponse(this.contenuService.update(contenu));
    } else {
      this.subscribeToSaveResponse(this.contenuService.create(contenu));
    }
  }

  trackSeanceById(index: number, item: ISeance): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContenu>>): void {
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

  protected updateForm(contenu: IContenu): void {
    this.editForm.patchValue({
      id: contenu.id,
      contenu: contenu.contenu,
      seance: contenu.seance,
    });

    this.seancesCollection = this.seanceService.addSeanceToCollectionIfMissing(this.seancesCollection, contenu.seance);
  }

  protected loadRelationshipsOptions(): void {
    this.seanceService
      .query({ filter: 'contenu-is-null' })
      .pipe(map((res: HttpResponse<ISeance[]>) => res.body ?? []))
      .pipe(map((seances: ISeance[]) => this.seanceService.addSeanceToCollectionIfMissing(seances, this.editForm.get('seance')!.value)))
      .subscribe((seances: ISeance[]) => (this.seancesCollection = seances));
  }

  protected createFromForm(): IContenu {
    return {
      ...new Contenu(),
      id: this.editForm.get(['id'])!.value,
      contenu: this.editForm.get(['contenu'])!.value,
      seance: this.editForm.get(['seance'])!.value,
    };
  }
}
