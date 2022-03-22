import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Sexe } from 'app/entities/enumerations/sexe.model';
import { IPersoAdmin, PersoAdmin } from '../perso-admin.model';

import { PersoAdminService } from './perso-admin.service';

describe('PersoAdmin Service', () => {
  let service: PersoAdminService;
  let httpMock: HttpTestingController;
  let elemDefault: IPersoAdmin;
  let expectedResult: IPersoAdmin | IPersoAdmin[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PersoAdminService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nom: 'AAAAAAA',
      prenom: 'AAAAAAA',
      email: 'AAAAAAA',
      adresse: 'AAAAAAA',
      telephone: 'AAAAAAA',
      sexe: Sexe.Masculin,
      photoContentType: 'image/png',
      photo: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a PersoAdmin', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PersoAdmin()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PersoAdmin', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nom: 'BBBBBB',
          prenom: 'BBBBBB',
          email: 'BBBBBB',
          adresse: 'BBBBBB',
          telephone: 'BBBBBB',
          sexe: 'BBBBBB',
          photo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PersoAdmin', () => {
      const patchObject = Object.assign(
        {
          prenom: 'BBBBBB',
          telephone: 'BBBBBB',
          sexe: 'BBBBBB',
        },
        new PersoAdmin()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PersoAdmin', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nom: 'BBBBBB',
          prenom: 'BBBBBB',
          email: 'BBBBBB',
          adresse: 'BBBBBB',
          telephone: 'BBBBBB',
          sexe: 'BBBBBB',
          photo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a PersoAdmin', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPersoAdminToCollectionIfMissing', () => {
      it('should add a PersoAdmin to an empty array', () => {
        const persoAdmin: IPersoAdmin = { id: 123 };
        expectedResult = service.addPersoAdminToCollectionIfMissing([], persoAdmin);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(persoAdmin);
      });

      it('should not add a PersoAdmin to an array that contains it', () => {
        const persoAdmin: IPersoAdmin = { id: 123 };
        const persoAdminCollection: IPersoAdmin[] = [
          {
            ...persoAdmin,
          },
          { id: 456 },
        ];
        expectedResult = service.addPersoAdminToCollectionIfMissing(persoAdminCollection, persoAdmin);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PersoAdmin to an array that doesn't contain it", () => {
        const persoAdmin: IPersoAdmin = { id: 123 };
        const persoAdminCollection: IPersoAdmin[] = [{ id: 456 }];
        expectedResult = service.addPersoAdminToCollectionIfMissing(persoAdminCollection, persoAdmin);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(persoAdmin);
      });

      it('should add only unique PersoAdmin to an array', () => {
        const persoAdminArray: IPersoAdmin[] = [{ id: 123 }, { id: 456 }, { id: 33861 }];
        const persoAdminCollection: IPersoAdmin[] = [{ id: 123 }];
        expectedResult = service.addPersoAdminToCollectionIfMissing(persoAdminCollection, ...persoAdminArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const persoAdmin: IPersoAdmin = { id: 123 };
        const persoAdmin2: IPersoAdmin = { id: 456 };
        expectedResult = service.addPersoAdminToCollectionIfMissing([], persoAdmin, persoAdmin2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(persoAdmin);
        expect(expectedResult).toContain(persoAdmin2);
      });

      it('should accept null and undefined values', () => {
        const persoAdmin: IPersoAdmin = { id: 123 };
        expectedResult = service.addPersoAdminToCollectionIfMissing([], null, persoAdmin, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(persoAdmin);
      });

      it('should return initial array if no PersoAdmin is added', () => {
        const persoAdminCollection: IPersoAdmin[] = [{ id: 123 }];
        expectedResult = service.addPersoAdminToCollectionIfMissing(persoAdminCollection, undefined, null);
        expect(expectedResult).toEqual(persoAdminCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
