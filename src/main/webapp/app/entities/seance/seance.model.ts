import dayjs from 'dayjs/esm';
import { IContenu } from 'app/entities/contenu/contenu.model';
import { ICours } from 'app/entities/cours/cours.model';
import { ISalle } from 'app/entities/salle/salle.model';
import { IGroupe } from 'app/entities/groupe/groupe.model';
import { IAbsence } from 'app/entities/absence/absence.model';

export interface ISeance {
  id?: number;
  dateSeance?: dayjs.Dayjs;
  dateDebut?: dayjs.Dayjs;
  dateFin?: dayjs.Dayjs;
  contenu?: IContenu | null;
  cours?: ICours | null;
  salle?: ISalle | null;
  groupe?: IGroupe | null;
  absences?: IAbsence[] | null;
}

export class Seance implements ISeance {
  constructor(
    public id?: number,
    public dateSeance?: dayjs.Dayjs,
    public dateDebut?: dayjs.Dayjs,
    public dateFin?: dayjs.Dayjs,
    public contenu?: IContenu | null,
    public cours?: ICours | null,
    public salle?: ISalle | null,
    public groupe?: IGroupe | null,
    public absences?: IAbsence[] | null
  ) {}
}

export function getSeanceIdentifier(seance: ISeance): number | undefined {
  return seance.id;
}
