import { ICours } from 'app/entities/cours/cours.model';
import { IGroupe } from 'app/entities/groupe/groupe.model';
import { IFiliere } from 'app/entities/filiere/filiere.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { NiveauEtude } from 'app/entities/enumerations/niveau-etude.model';

export interface IClasse {
  id?: number;
  titre?: string;
  niveauEtude?: NiveauEtude;
  cours?: ICours[] | null;
  groupes?: IGroupe[] | null;
  filiere?: IFiliere | null;
  serie?: ISerie | null;
}

export class Classe implements IClasse {
  constructor(
    public id?: number,
    public titre?: string,
    public niveauEtude?: NiveauEtude,
    public cours?: ICours[] | null,
    public groupes?: IGroupe[] | null,
    public filiere?: IFiliere | null,
    public serie?: ISerie | null
  ) {}
}

export function getClasseIdentifier(classe: IClasse): number | undefined {
  return classe.id;
}
