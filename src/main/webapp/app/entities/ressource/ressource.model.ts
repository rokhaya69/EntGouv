import dayjs from 'dayjs/esm';
import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { IGroupe } from 'app/entities/groupe/groupe.model';
import { ICours } from 'app/entities/cours/cours.model';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { TypeRessource } from 'app/entities/enumerations/type-ressource.model';

export interface IRessource {
  id?: number;
  libelRessource?: string;
  typeRessource?: TypeRessource;
  lienRessource?: string;
  dateMise?: dayjs.Dayjs | null;
  apprenant?: IApprenant | null;
  groupe?: IGroupe | null;
  cours?: ICours | null;
  persoAdmin?: IPersoAdmin | null;
  etablissements?: IEtablissement[] | null;
}

export class Ressource implements IRessource {
  constructor(
    public id?: number,
    public libelRessource?: string,
    public typeRessource?: TypeRessource,
    public lienRessource?: string,
    public dateMise?: dayjs.Dayjs | null,
    public apprenant?: IApprenant | null,
    public groupe?: IGroupe | null,
    public cours?: ICours | null,
    public persoAdmin?: IPersoAdmin | null,
    public etablissements?: IEtablissement[] | null
  ) {}
}

export function getRessourceIdentifier(ressource: IRessource): number | undefined {
  return ressource.id;
}
