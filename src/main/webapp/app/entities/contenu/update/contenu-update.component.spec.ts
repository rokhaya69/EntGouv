import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContenuService } from '../service/contenu.service';
import { IContenu, Contenu } from '../contenu.model';
import { ISeance } from 'app/entities/seance/seance.model';
import { SeanceService } from 'app/entities/seance/service/seance.service';

import { ContenuUpdateComponent } from './contenu-update.component';

describe('Contenu Management Update Component', () => {
  let comp: ContenuUpdateComponent;
  let fixture: ComponentFixture<ContenuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contenuService: ContenuService;
  let seanceService: SeanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ContenuUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ContenuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContenuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contenuService = TestBed.inject(ContenuService);
    seanceService = TestBed.inject(SeanceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call seance query and add missing value', () => {
      const contenu: IContenu = { id: 456 };
      const seance: ISeance = { id: 45101 };
      contenu.seance = seance;

      const seanceCollection: ISeance[] = [{ id: 68839 }];
      jest.spyOn(seanceService, 'query').mockReturnValue(of(new HttpResponse({ body: seanceCollection })));
      const expectedCollection: ISeance[] = [seance, ...seanceCollection];
      jest.spyOn(seanceService, 'addSeanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contenu });
      comp.ngOnInit();

      expect(seanceService.query).toHaveBeenCalled();
      expect(seanceService.addSeanceToCollectionIfMissing).toHaveBeenCalledWith(seanceCollection, seance);
      expect(comp.seancesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const contenu: IContenu = { id: 456 };
      const seance: ISeance = { id: 27869 };
      contenu.seance = seance;

      activatedRoute.data = of({ contenu });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(contenu));
      expect(comp.seancesCollection).toContain(seance);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Contenu>>();
      const contenu = { id: 123 };
      jest.spyOn(contenuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contenu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contenu }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(contenuService.update).toHaveBeenCalledWith(contenu);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Contenu>>();
      const contenu = new Contenu();
      jest.spyOn(contenuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contenu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contenu }));
      saveSubject.complete();

      // THEN
      expect(contenuService.create).toHaveBeenCalledWith(contenu);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Contenu>>();
      const contenu = { id: 123 };
      jest.spyOn(contenuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contenu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contenuService.update).toHaveBeenCalledWith(contenu);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackSeanceById', () => {
      it('Should return tracked Seance primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSeanceById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
