import { ISeance } from 'app/entities/seance/seance.model';

export interface IContenu {
  id?: number;
  contenu?: string;
  seance?: ISeance | null;
}

export class Contenu implements IContenu {
  constructor(public id?: number, public contenu?: string, public seance?: ISeance | null) {}
}

export function getContenuIdentifier(contenu: IContenu): number | undefined {
  return contenu.id;
}
