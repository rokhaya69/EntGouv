import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PersoAdminService } from '../service/perso-admin.service';
import { IPersoAdmin, PersoAdmin } from '../perso-admin.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IEvaluation } from 'app/entities/evaluation/evaluation.model';
import { EvaluationService } from 'app/entities/evaluation/service/evaluation.service';
import { IPoste } from 'app/entities/poste/poste.model';
import { PosteService } from 'app/entities/poste/service/poste.service';

import { PersoAdminUpdateComponent } from './perso-admin-update.component';

describe('PersoAdmin Management Update Component', () => {
  let comp: PersoAdminUpdateComponent;
  let fixture: ComponentFixture<PersoAdminUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let persoAdminService: PersoAdminService;
  let userService: UserService;
  let evaluationService: EvaluationService;
  let posteService: PosteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PersoAdminUpdateComponent],
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
      .overrideTemplate(PersoAdminUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PersoAdminUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    persoAdminService = TestBed.inject(PersoAdminService);
    userService = TestBed.inject(UserService);
    evaluationService = TestBed.inject(EvaluationService);
    posteService = TestBed.inject(PosteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const persoAdmin: IPersoAdmin = { id: 456 };
      const user: IUser = { id: 47224 };
      persoAdmin.user = user;

      const userCollection: IUser[] = [{ id: 70940 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ persoAdmin });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Evaluation query and add missing value', () => {
      const persoAdmin: IPersoAdmin = { id: 456 };
      const evaluations: IEvaluation[] = [{ id: 95630 }];
      persoAdmin.evaluations = evaluations;

      const evaluationCollection: IEvaluation[] = [{ id: 26859 }];
      jest.spyOn(evaluationService, 'query').mockReturnValue(of(new HttpResponse({ body: evaluationCollection })));
      const additionalEvaluations = [...evaluations];
      const expectedCollection: IEvaluation[] = [...additionalEvaluations, ...evaluationCollection];
      jest.spyOn(evaluationService, 'addEvaluationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ persoAdmin });
      comp.ngOnInit();

      expect(evaluationService.query).toHaveBeenCalled();
      expect(evaluationService.addEvaluationToCollectionIfMissing).toHaveBeenCalledWith(evaluationCollection, ...additionalEvaluations);
      expect(comp.evaluationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Poste query and add missing value', () => {
      const persoAdmin: IPersoAdmin = { id: 456 };
      const poste: IPoste = { id: 55410 };
      persoAdmin.poste = poste;

      const posteCollection: IPoste[] = [{ id: 36648 }];
      jest.spyOn(posteService, 'query').mockReturnValue(of(new HttpResponse({ body: posteCollection })));
      const additionalPostes = [poste];
      const expectedCollection: IPoste[] = [...additionalPostes, ...posteCollection];
      jest.spyOn(posteService, 'addPosteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ persoAdmin });
      comp.ngOnInit();

      expect(posteService.query).toHaveBeenCalled();
      expect(posteService.addPosteToCollectionIfMissing).toHaveBeenCalledWith(posteCollection, ...additionalPostes);
      expect(comp.postesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const persoAdmin: IPersoAdmin = { id: 456 };
      const user: IUser = { id: 1331 };
      persoAdmin.user = user;
      const evaluations: IEvaluation = { id: 77868 };
      persoAdmin.evaluations = [evaluations];
      const poste: IPoste = { id: 86543 };
      persoAdmin.poste = poste;

      activatedRoute.data = of({ persoAdmin });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(persoAdmin));
      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.evaluationsSharedCollection).toContain(evaluations);
      expect(comp.postesSharedCollection).toContain(poste);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PersoAdmin>>();
      const persoAdmin = { id: 123 };
      jest.spyOn(persoAdminService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ persoAdmin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: persoAdmin }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(persoAdminService.update).toHaveBeenCalledWith(persoAdmin);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PersoAdmin>>();
      const persoAdmin = new PersoAdmin();
      jest.spyOn(persoAdminService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ persoAdmin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: persoAdmin }));
      saveSubject.complete();

      // THEN
      expect(persoAdminService.create).toHaveBeenCalledWith(persoAdmin);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PersoAdmin>>();
      const persoAdmin = { id: 123 };
      jest.spyOn(persoAdminService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ persoAdmin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(persoAdminService.update).toHaveBeenCalledWith(persoAdmin);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEvaluationById', () => {
      it('Should return tracked Evaluation primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEvaluationById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPosteById', () => {
      it('Should return tracked Poste primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPosteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedEvaluation', () => {
      it('Should return option if no Evaluation is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedEvaluation(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Evaluation for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedEvaluation(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Evaluation is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedEvaluation(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
