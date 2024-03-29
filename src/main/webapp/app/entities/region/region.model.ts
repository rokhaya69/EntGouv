import { IDepartement } from 'app/entities/departement/departement.model';
import { NomRegion } from 'app/entities/enumerations/nom-region.model';

export interface IRegion {
  id?: number;
  nomRegion?: NomRegion;
  departements?: IDepartement[] | null;
}

export class Region implements IRegion {
  constructor(public id?: number, public nomRegion?: NomRegion, public departements?: IDepartement[] | null) {}
}

export function getRegionIdentifier(region: IRegion): number | undefined {
  return region.id;
}
