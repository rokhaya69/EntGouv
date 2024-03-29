import { ICommune } from 'app/entities/commune/commune.model';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { TypeInspec } from 'app/entities/enumerations/type-inspec.model';

export interface IInspection {
  id?: number;
  nomInspec?: string;
  typeInspec?: TypeInspec;
  email?: string;
  telephone?: string;
  commune?: ICommune | null;
  persoAdmin?: IPersoAdmin | null;
  etablissements?: IEtablissement[] | null;
}

export class Inspection implements IInspection {
  constructor(
    public id?: number,
    public nomInspec?: string,
    public typeInspec?: TypeInspec,
    public email?: string,
    public telephone?: string,
    public commune?: ICommune | null,
    public persoAdmin?: IPersoAdmin | null,
    public etablissements?: IEtablissement[] | null
  ) {}
}

export function getInspectionIdentifier(inspection: IInspection): number | undefined {
  return inspection.id;
}
