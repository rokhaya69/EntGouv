import { IUser } from 'app/entities/user/user.model';
import { IRessource } from 'app/entities/ressource/ressource.model';
import { IEvaluation } from 'app/entities/evaluation/evaluation.model';
import { IPoste } from 'app/entities/poste/poste.model';
import { Sexe } from 'app/entities/enumerations/sexe.model';

export interface IPersoAdmin {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  adresse?: string;
  telephone?: string;
  sexe?: Sexe;
  photoContentType?: string | null;
  photo?: string | null;
  user?: IUser | null;
  ressources?: IRessource[] | null;
  evaluations?: IEvaluation[] | null;
  poste?: IPoste | null;
}

export class PersoAdmin implements IPersoAdmin {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public adresse?: string,
    public telephone?: string,
    public sexe?: Sexe,
    public photoContentType?: string | null,
    public photo?: string | null,
    public user?: IUser | null,
    public ressources?: IRessource[] | null,
    public evaluations?: IEvaluation[] | null,
    public poste?: IPoste | null
  ) {}
}

export function getPersoAdminIdentifier(persoAdmin: IPersoAdmin): number | undefined {
  return persoAdmin.id;
}
