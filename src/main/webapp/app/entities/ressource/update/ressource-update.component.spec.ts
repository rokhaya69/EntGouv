import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RessourceService } from '../service/ressource.service';
import { IRessource, Ressource } from '../ressource.model';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { ApprenantService } from 'app/entities/apprenant/service/apprenant.service';
import { IGroupe } from 'app/entities/groupe/groupe.model';
import { GroupeService } from 'app/entities/groupe/service/groupe.service';
import { ICours } from 'app/entities/cours/cours.model';
import { CoursService } from 'app/entities/cours/service/cours.service';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { PersoAdminService } from 'app/entities/perso-admin/service/perso-admin.service';

import { RessourceUpdateComponent } from './ressource-update.component';

describe('Ressource Management Update Component', () => {
  let comp: RessourceUpdateComponent;
  let fixture: ComponentFixture<RessourceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ressourceService: RessourceService;
  let apprenantService: ApprenantService;
  let groupeService: GroupeService;
  let coursService: CoursService;
  let persoAdminService: PersoAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RessourceUpdateComponent],
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
      .overrideTemplate(RessourceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RessourceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ressourceService = TestBed.inject(RessourceService);
    apprenantService = TestBed.inject(ApprenantService);
    groupeService = TestBed.inject(GroupeService);
    coursService = TestBed.inject(CoursService);
    persoAdminService = TestBed.inject(PersoAdminService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Apprenant query and add missing value', () => {
      const ressource: IRessource = { id: 456 };
      const apprenant: IApprenant = { id: 38370 };
      ressource.apprenant = apprenant;

      const apprenantCollection: IApprenant[] = [{ id: 65520 }];
      jest.spyOn(apprenantService, 'query').mockReturnValue(of(new HttpResponse({ body: apprenantCollection })));
      const additionalApprenants = [apprenant];
      const expectedCollection: IApprenant[] = [...additionalApprenants, ...apprenantCollection];
      jest.spyOn(apprenantService, 'addApprenantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ressource });
      comp.ngOnInit();

      expect(apprenantService.query).toHaveBeenCalled();
      expect(apprenantService.addApprenantToCollectionIfMissing).toHaveBeenCalledWith(apprenantCollection, ...additionalApprenants);
      expect(comp.apprenantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Groupe query and add missing value', () => {
      const ressource: IRessource = { id: 456 };
      const groupe: IGroupe = { id: 62246 };
      ressource.groupe = groupe;

      const groupeCollection: IGroupe[] = [{ id: 50754 }];
      jest.spyOn(groupeService, 'query').mockReturnValue(of(new HttpResponse({ body: groupeCollection })));
      const additionalGroupes = [groupe];
      const expectedCollection: IGroupe[] = [...additionalGroupes, ...groupeCollection];
      jest.spyOn(groupeService, 'addGroupeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ressource });
      comp.ngOnInit();

      expect(groupeService.query).toHaveBeenCalled();
      expect(groupeService.addGroupeToCollectionIfMissing).toHaveBeenCalledWith(groupeCollection, ...additionalGroupes);
      expect(comp.groupesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Cours query and add missing value', () => {
      const ressource: IRessource = { id: 456 };
      const cours: ICours = { id: 18497 };
      ressource.cours = cours;

      const coursCollection: ICours[] = [{ id: 53759 }];
      jest.spyOn(coursService, 'query').mockReturnValue(of(new HttpResponse({ body: coursCollection })));
      const additionalCours = [cours];
      const expectedCollection: ICours[] = [...additionalCours, ...coursCollection];
      jest.spyOn(coursService, 'addCoursToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ressource });
      comp.ngOnInit();

      expect(coursService.query).toHaveBeenCalled();
      expect(coursService.addCoursToCollectionIfMissing).toHaveBeenCalledWith(coursCollection, ...additionalCours);
      expect(comp.coursSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PersoAdmin query and add missing value', () => {
      const ressource: IRessource = { id: 456 };
      const persoAdmin: IPersoAdmin = { id: 7724 };
      ressource.persoAdmin = persoAdmin;

      const persoAdminCollection: IPersoAdmin[] = [{ id: 31263 }];
      jest.spyOn(persoAdminService, 'query').mockReturnValue(of(new HttpResponse({ body: persoAdminCollection })));
      const additionalPersoAdmins = [persoAdmin];
      const expectedCollection: IPersoAdmin[] = [...additionalPersoAdmins, ...persoAdminCollection];
      jest.spyOn(persoAdminService, 'addPersoAdminToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ressource });
      comp.ngOnInit();

      expect(persoAdminService.query).toHaveBeenCalled();
      expect(persoAdminService.addPersoAdminToCollectionIfMissing).toHaveBeenCalledWith(persoAdminCollection, ...additionalPersoAdmins);
      expect(comp.persoAdminsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ressource: IRessource = { id: 456 };
      const apprenant: IApprenant = { id: 33463 };
      ressource.apprenant = apprenant;
      const groupe: IGroupe = { id: 22309 };
      ressource.groupe = groupe;
      const cours: ICours = { id: 47043 };
      ressource.cours = cours;
      const persoAdmin: IPersoAdmin = { id: 23319 };
      ressource.persoAdmin = persoAdmin;

      activatedRoute.data = of({ ressource });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(ressource));
      expect(comp.apprenantsSharedCollection).toContain(apprenant);
      expect(comp.groupesSharedCollection).toContain(groupe);
      expect(comp.coursSharedCollection).toContain(cours);
      expect(comp.persoAdminsSharedCollection).toContain(persoAdmin);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Ressource>>();
      const ressource = { id: 123 };
      jest.spyOn(ressourceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ressource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ressource }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(ressourceService.update).toHaveBeenCalledWith(ressource);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Ressource>>();
      const ressource = new Ressource();
      jest.spyOn(ressourceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ressource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ressource }));
      saveSubject.complete();

      // THEN
      expect(ressourceService.create).toHaveBeenCalledWith(ressource);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Ressource>>();
      const ressource = { id: 123 };
      jest.spyOn(ressourceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ressource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ressourceService.update).toHaveBeenCalledWith(ressource);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackApprenantById', () => {
      it('Should return tracked Apprenant primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackApprenantById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackGroupeById', () => {
      it('Should return tracked Groupe primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackGroupeById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackCoursById', () => {
      it('Should return tracked Cours primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCoursById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPersoAdminById', () => {
      it('Should return tracked PersoAdmin primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPersoAdminById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
