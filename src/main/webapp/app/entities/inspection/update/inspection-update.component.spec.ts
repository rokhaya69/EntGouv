import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InspectionService } from '../service/inspection.service';
import { IInspection, Inspection } from '../inspection.model';
import { ICommune } from 'app/entities/commune/commune.model';
import { CommuneService } from 'app/entities/commune/service/commune.service';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { PersoAdminService } from 'app/entities/perso-admin/service/perso-admin.service';

import { InspectionUpdateComponent } from './inspection-update.component';

describe('Inspection Management Update Component', () => {
  let comp: InspectionUpdateComponent;
  let fixture: ComponentFixture<InspectionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inspectionService: InspectionService;
  let communeService: CommuneService;
  let persoAdminService: PersoAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InspectionUpdateComponent],
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
      .overrideTemplate(InspectionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InspectionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inspectionService = TestBed.inject(InspectionService);
    communeService = TestBed.inject(CommuneService);
    persoAdminService = TestBed.inject(PersoAdminService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call commune query and add missing value', () => {
      const inspection: IInspection = { id: 456 };
      const commune: ICommune = { id: 17542 };
      inspection.commune = commune;

      const communeCollection: ICommune[] = [{ id: 11049 }];
      jest.spyOn(communeService, 'query').mockReturnValue(of(new HttpResponse({ body: communeCollection })));
      const expectedCollection: ICommune[] = [commune, ...communeCollection];
      jest.spyOn(communeService, 'addCommuneToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inspection });
      comp.ngOnInit();

      expect(communeService.query).toHaveBeenCalled();
      expect(communeService.addCommuneToCollectionIfMissing).toHaveBeenCalledWith(communeCollection, commune);
      expect(comp.communesCollection).toEqual(expectedCollection);
    });

    it('Should call persoAdmin query and add missing value', () => {
      const inspection: IInspection = { id: 456 };
      const persoAdmin: IPersoAdmin = { id: 55752 };
      inspection.persoAdmin = persoAdmin;

      const persoAdminCollection: IPersoAdmin[] = [{ id: 25212 }];
      jest.spyOn(persoAdminService, 'query').mockReturnValue(of(new HttpResponse({ body: persoAdminCollection })));
      const expectedCollection: IPersoAdmin[] = [persoAdmin, ...persoAdminCollection];
      jest.spyOn(persoAdminService, 'addPersoAdminToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inspection });
      comp.ngOnInit();

      expect(persoAdminService.query).toHaveBeenCalled();
      expect(persoAdminService.addPersoAdminToCollectionIfMissing).toHaveBeenCalledWith(persoAdminCollection, persoAdmin);
      expect(comp.persoAdminsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const inspection: IInspection = { id: 456 };
      const commune: ICommune = { id: 12940 };
      inspection.commune = commune;
      const persoAdmin: IPersoAdmin = { id: 8268 };
      inspection.persoAdmin = persoAdmin;

      activatedRoute.data = of({ inspection });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inspection));
      expect(comp.communesCollection).toContain(commune);
      expect(comp.persoAdminsCollection).toContain(persoAdmin);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inspection>>();
      const inspection = { id: 123 };
      jest.spyOn(inspectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inspection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inspection }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inspectionService.update).toHaveBeenCalledWith(inspection);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inspection>>();
      const inspection = new Inspection();
      jest.spyOn(inspectionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inspection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inspection }));
      saveSubject.complete();

      // THEN
      expect(inspectionService.create).toHaveBeenCalledWith(inspection);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inspection>>();
      const inspection = { id: 123 };
      jest.spyOn(inspectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inspection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inspectionService.update).toHaveBeenCalledWith(inspection);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackCommuneById', () => {
      it('Should return tracked Commune primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCommuneById(0, entity);
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
