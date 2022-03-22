import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISyllabus, Syllabus } from '../syllabus.model';
import { SyllabusService } from '../service/syllabus.service';
import { IProgramme } from 'app/entities/programme/programme.model';
import { ProgrammeService } from 'app/entities/programme/service/programme.service';

@Component({
  selector: 'jhi-syllabus-update',
  templateUrl: './syllabus-update.component.html',
})
export class SyllabusUpdateComponent implements OnInit {
  isSaving = false;

  programmesSharedCollection: IProgramme[] = [];

  editForm = this.fb.group({
    id: [],
    syllabus: [null, [Validators.required]],
    programme: [],
  });

  constructor(
    protected syllabusService: SyllabusService,
    protected programmeService: ProgrammeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ syllabus }) => {
      this.updateForm(syllabus);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const syllabus = this.createFromForm();
    if (syllabus.id !== undefined) {
      this.subscribeToSaveResponse(this.syllabusService.update(syllabus));
    } else {
      this.subscribeToSaveResponse(this.syllabusService.create(syllabus));
    }
  }

  trackProgrammeById(index: number, item: IProgramme): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISyllabus>>): void {
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

  protected updateForm(syllabus: ISyllabus): void {
    this.editForm.patchValue({
      id: syllabus.id,
      syllabus: syllabus.syllabus,
      programme: syllabus.programme,
    });

    this.programmesSharedCollection = this.programmeService.addProgrammeToCollectionIfMissing(
      this.programmesSharedCollection,
      syllabus.programme
    );
  }

  protected loadRelationshipsOptions(): void {
    this.programmeService
      .query()
      .pipe(map((res: HttpResponse<IProgramme[]>) => res.body ?? []))
      .pipe(
        map((programmes: IProgramme[]) =>
          this.programmeService.addProgrammeToCollectionIfMissing(programmes, this.editForm.get('programme')!.value)
        )
      )
      .subscribe((programmes: IProgramme[]) => (this.programmesSharedCollection = programmes));
  }

  protected createFromForm(): ISyllabus {
    return {
      ...new Syllabus(),
      id: this.editForm.get(['id'])!.value,
      syllabus: this.editForm.get(['syllabus'])!.value,
      programme: this.editForm.get(['programme'])!.value,
    };
  }
}
