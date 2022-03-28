import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EtablissementService } from '../service/etablissement.service';
import { IEtablissement, Etablissement } from '../etablissement.model';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { PersoAdminService } from 'app/entities/perso-admin/service/perso-admin.service';
import { ICommune } from 'app/entities/commune/commune.model';
import { CommuneService } from 'app/entities/commune/service/commune.service';
import { IRessource } from 'app/entities/ressource/ressource.model';
import { RessourceService } from 'app/entities/ressource/service/ressource.service';
import { IInspection } from 'app/entities/inspection/inspection.model';
import { InspectionService } from 'app/entities/inspection/service/inspection.service';

import { EtablissementUpdateComponent } from './etablissement-update.component';

describe('Etablissement Management Update Component', () => {
  let comp: EtablissementUpdateComponent;
  let fixture: ComponentFixture<EtablissementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let etablissementService: EtablissementService;
  let persoAdminService: PersoAdminService;
  let communeService: CommuneService;
  let ressourceService: RessourceService;
  let inspectionService: InspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EtablissementUpdateComponent],
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
      .overrideTemplate(EtablissementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EtablissementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    etablissementService = TestBed.inject(EtablissementService);
    persoAdminService = TestBed.inject(PersoAdminService);
    communeService = TestBed.inject(CommuneService);
    ressourceService = TestBed.inject(RessourceService);
    inspectionService = TestBed.inject(InspectionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call persoAdmin query and add missing value', () => {
      const etablissement: IEtablissement = { id: 456 };
      const persoAdmin: IPersoAdmin = { id: 53833 };
      etablissement.persoAdmin = persoAdmin;

      const persoAdminCollection: IPersoAdmin[] = [{ id: 60609 }];
      jest.spyOn(persoAdminService, 'query').mockReturnValue(of(new HttpResponse({ body: persoAdminCollection })));
      const expectedCollection: IPersoAdmin[] = [persoAdmin, ...persoAdminCollection];
      jest.spyOn(persoAdminService, 'addPersoAdminToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(persoAdminService.query).toHaveBeenCalled();
      expect(persoAdminService.addPersoAdminToCollectionIfMissing).toHaveBeenCalledWith(persoAdminCollection, persoAdmin);
      expect(comp.persoAdminsCollection).toEqual(expectedCollection);
    });

    it('Should call commune query and add missing value', () => {
      const etablissement: IEtablissement = { id: 456 };
      const commune: ICommune = { id: 41122 };
      etablissement.commune = commune;

      const communeCollection: ICommune[] = [{ id: 46121 }];
      jest.spyOn(communeService, 'query').mockReturnValue(of(new HttpResponse({ body: communeCollection })));
      const expectedCollection: ICommune[] = [commune, ...communeCollection];
      jest.spyOn(communeService, 'addCommuneToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(communeService.query).toHaveBeenCalled();
      expect(communeService.addCommuneToCollectionIfMissing).toHaveBeenCalledWith(communeCollection, commune);
      expect(comp.communesCollection).toEqual(expectedCollection);
    });

    it('Should call Ressource query and add missing value', () => {
      const etablissement: IEtablissement = { id: 456 };
      const ressources: IRessource[] = [{ id: 88061 }];
      etablissement.ressources = ressources;

      const ressourceCollection: IRessource[] = [{ id: 28129 }];
      jest.spyOn(ressourceService, 'query').mockReturnValue(of(new HttpResponse({ body: ressourceCollection })));
      const additionalRessources = [...ressources];
      const expectedCollection: IRessource[] = [...additionalRessources, ...ressourceCollection];
      jest.spyOn(ressourceService, 'addRessourceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(ressourceService.query).toHaveBeenCalled();
      expect(ressourceService.addRessourceToCollectionIfMissing).toHaveBeenCalledWith(ressourceCollection, ...additionalRessources);
      expect(comp.ressourcesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Inspection query and add missing value', () => {
      const etablissement: IEtablissement = { id: 456 };
      const inspection: IInspection = { id: 29576 };
      etablissement.inspection = inspection;

      const inspectionCollection: IInspection[] = [{ id: 52036 }];
      jest.spyOn(inspectionService, 'query').mockReturnValue(of(new HttpResponse({ body: inspectionCollection })));
      const additionalInspections = [inspection];
      const expectedCollection: IInspection[] = [...additionalInspections, ...inspectionCollection];
      jest.spyOn(inspectionService, 'addInspectionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(inspectionService.query).toHaveBeenCalled();
      expect(inspectionService.addInspectionToCollectionIfMissing).toHaveBeenCalledWith(inspectionCollection, ...additionalInspections);
      expect(comp.inspectionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const etablissement: IEtablissement = { id: 456 };
      const persoAdmin: IPersoAdmin = { id: 74645 };
      etablissement.persoAdmin = persoAdmin;
      const commune: ICommune = { id: 16135 };
      etablissement.commune = commune;
      const ressources: IRessource = { id: 66533 };
      etablissement.ressources = [ressources];
      const inspection: IInspection = { id: 53283 };
      etablissement.inspection = inspection;

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(etablissement));
      expect(comp.persoAdminsCollection).toContain(persoAdmin);
      expect(comp.communesCollection).toContain(commune);
      expect(comp.ressourcesSharedCollection).toContain(ressources);
      expect(comp.inspectionsSharedCollection).toContain(inspection);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etablissement>>();
      const etablissement = { id: 123 };
      jest.spyOn(etablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etablissement }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(etablissementService.update).toHaveBeenCalledWith(etablissement);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etablissement>>();
      const etablissement = new Etablissement();
      jest.spyOn(etablissementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etablissement }));
      saveSubject.complete();

      // THEN
      expect(etablissementService.create).toHaveBeenCalledWith(etablissement);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etablissement>>();
      const etablissement = { id: 123 };
      jest.spyOn(etablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(etablissementService.update).toHaveBeenCalledWith(etablissement);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPersoAdminById', () => {
      it('Should return tracked PersoAdmin primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPersoAdminById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackCommuneById', () => {
      it('Should return tracked Commune primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCommuneById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackRessourceById', () => {
      it('Should return tracked Ressource primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRessourceById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackInspectionById', () => {
      it('Should return tracked Inspection primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInspectionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedRessource', () => {
      it('Should return option if no Ressource is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedRessource(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Ressource for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedRessource(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Ressource is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedRessource(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
