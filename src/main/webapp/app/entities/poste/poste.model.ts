import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';
import { NomPoste } from 'app/entities/enumerations/nom-poste.model';

export interface IPoste {
  id?: number;
  nomPoste?: NomPoste;
  persoAdmins?: IPersoAdmin[] | null;
}

export class Poste implements IPoste {
  constructor(public id?: number, public nomPoste?: NomPoste, public persoAdmins?: IPersoAdmin[] | null) {}
}

export function getPosteIdentifier(poste: IPoste): number | undefined {
  return poste.id;
}
