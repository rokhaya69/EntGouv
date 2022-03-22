import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPersoAdmin, PersoAdmin } from '../perso-admin.model';
import { PersoAdminService } from '../service/perso-admin.service';

import { PersoAdminRoutingResolveService } from './perso-admin-routing-resolve.service';

describe('PersoAdmin routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PersoAdminRoutingResolveService;
  let service: PersoAdminService;
  let resultPersoAdmin: IPersoAdmin | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(PersoAdminRoutingResolveService);
    service = TestBed.inject(PersoAdminService);
    resultPersoAdmin = undefined;
  });

  describe('resolve', () => {
    it('should return IPersoAdmin returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPersoAdmin = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPersoAdmin).toEqual({ id: 123 });
    });

    it('should return new IPersoAdmin if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPersoAdmin = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPersoAdmin).toEqual(new PersoAdmin());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PersoAdmin })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPersoAdmin = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPersoAdmin).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
