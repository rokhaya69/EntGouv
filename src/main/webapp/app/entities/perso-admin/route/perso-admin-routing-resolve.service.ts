import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPersoAdmin, PersoAdmin } from '../perso-admin.model';
import { PersoAdminService } from '../service/perso-admin.service';

@Injectable({ providedIn: 'root' })
export class PersoAdminRoutingResolveService implements Resolve<IPersoAdmin> {
  constructor(protected service: PersoAdminService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersoAdmin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((persoAdmin: HttpResponse<PersoAdmin>) => {
          if (persoAdmin.body) {
            return of(persoAdmin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PersoAdmin());
  }
}
