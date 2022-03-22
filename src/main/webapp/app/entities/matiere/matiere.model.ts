import { ICours } from 'app/entities/cours/cours.model';
import { IEvaluation } from 'app/entities/evaluation/evaluation.model';
import { IProgramme } from 'app/entities/programme/programme.model';

export interface IMatiere {
  id?: number;
  intituleMatiere?: string;
  cours?: ICours[] | null;
  evaluations?: IEvaluation[] | null;
  programme?: IProgramme | null;
}

export class Matiere implements IMatiere {
  constructor(
    public id?: number,
    public intituleMatiere?: string,
    public cours?: ICours[] | null,
    public evaluations?: IEvaluation[] | null,
    public programme?: IProgramme | null
  ) {}
}

export function getMatiereIdentifier(matiere: IMatiere): number | undefined {
  return matiere.id;
}
