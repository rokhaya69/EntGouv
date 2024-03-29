import dayjs from 'dayjs/esm';
import { INote } from 'app/entities/note/note.model';
import { IAbsence } from 'app/entities/absence/absence.model';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { IGroupe } from 'app/entities/groupe/groupe.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';
import { ISalle } from 'app/entities/salle/salle.model';
import { IPersoAdmin } from 'app/entities/perso-admin/perso-admin.model';

export interface IEvaluation {
  id?: number;
  nomEvalu?: string;
  typeEvalu?: string;
  dateEva?: dayjs.Dayjs;
  heureDebEva?: dayjs.Dayjs;
  heureFinEva?: dayjs.Dayjs;
  notes?: INote[] | null;
  absences?: IAbsence[] | null;
  matiere?: IMatiere | null;
  groupe?: IGroupe | null;
  professeur?: IProfesseur | null;
  salle?: ISalle | null;
  persoAdmins?: IPersoAdmin[] | null;
}

export class Evaluation implements IEvaluation {
  constructor(
    public id?: number,
    public nomEvalu?: string,
    public typeEvalu?: string,
    public dateEva?: dayjs.Dayjs,
    public heureDebEva?: dayjs.Dayjs,
    public heureFinEva?: dayjs.Dayjs,
    public notes?: INote[] | null,
    public absences?: IAbsence[] | null,
    public matiere?: IMatiere | null,
    public groupe?: IGroupe | null,
    public professeur?: IProfesseur | null,
    public salle?: ISalle | null,
    public persoAdmins?: IPersoAdmin[] | null
  ) {}
}

export function getEvaluationIdentifier(evaluation: IEvaluation): number | undefined {
  return evaluation.id;
}
