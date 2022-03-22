import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { IRessource } from 'app/entities/ressource/ressource.model';
import { IInspection } from 'app/entities/inspection/inspection.model';
import { TypeEtab } from 'app/entities/enumerations/type-etab.model';

export interface IEtablissement {
  id?: number;
  nomEtab?: string;
  typeEtab?: TypeEtab;
  persoAdmin?: IPersoAdmin | null;
  professeurs?: IProfesseur[] | null;
  filieres?: IFiliere[] | null;
  series?: ISerie[] | null;
  ressources?: IRessource[] | null;
  inspection?: IInspection | null;
}

export class Etablissement implements IEtablissement {
  constructor(
    public id?: number,
    public nomEtab?: string,
    public typeEtab?: TypeEtab,
    public persoAdmin?: IPersoAdmin | null,
    public professeurs?: IProfesseur[] | null,
    public filieres?: IFiliere[] | null,
    public series?: ISerie[] | null,
    public ressources?: IRessource[] | null,
    public inspection?: IInspection | null
  ) {}
}

export function getEtablissementIdentifier(etablissement: IEtablissement): number | undefined {
  return etablissement.id;
}
