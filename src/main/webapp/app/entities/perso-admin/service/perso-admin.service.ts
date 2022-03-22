import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPersoAdmin, getPersoAdminIdentifier } from '../perso-admin.model';

export type EntityResponseType = HttpResponse<IPersoAdmin>;
export type EntityArrayResponseType = HttpResponse<IPersoAdmin[]>;

@Injectable({ providedIn: 'root' })
export class PersoAdminService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/perso-admins');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(persoAdmin: IPersoAdmin): Observable<EntityResponseType> {
    return this.http.post<IPersoAdmin>(this.resourceUrl, persoAdmin, { observe: 'response' });
  }

  update(persoAdmin: IPersoAdmin): Observable<EntityResponseType> {
    return this.http.put<IPersoAdmin>(`${this.resourceUrl}/${getPersoAdminIdentifier(persoAdmin) as number}`, persoAdmin, {
      observe: 'response',
    });
  }

  partialUpdate(persoAdmin: IPersoAdmin): Observable<EntityResponseType> {
    return this.http.patch<IPersoAdmin>(`${this.resourceUrl}/${getPersoAdminIdentifier(persoAdmin) as number}`, persoAdmin, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersoAdmin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersoAdmin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPersoAdminToCollectionIfMissing(
    persoAdminCollection: IPersoAdmin[],
    ...persoAdminsToCheck: (IPersoAdmin | null | undefined)[]
  ): IPersoAdmin[] {
    const persoAdmins: IPersoAdmin[] = persoAdminsToCheck.filter(isPresent);
    if (persoAdmins.length > 0) {
      const persoAdminCollectionIdentifiers = persoAdminCollection.map(persoAdminItem => getPersoAdminIdentifier(persoAdminItem)!);
      const persoAdminsToAdd = persoAdmins.filter(persoAdminItem => {
        const persoAdminIdentifier = getPersoAdminIdentifier(persoAdminItem);
        if (persoAdminIdentifier == null || persoAdminCollectionIdentifiers.includes(persoAdminIdentifier)) {
          return false;
        }
        persoAdminCollectionIdentifiers.push(persoAdminIdentifier);
        return true;
      });
      return [...persoAdminsToAdd, ...persoAdminCollection];
    }
    return persoAdminCollection;
  }
}
