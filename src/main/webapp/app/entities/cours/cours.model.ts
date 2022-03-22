import { ISyllabus } from 'app/entities/syllabus/syllabus.model';
import { ISeance } from 'app/entities/seance/seance.model';
import { IRessource } from 'app/entities/ressource/ressource.model';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { IClasse } from 'app/entities/classe/classe.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';

export interface ICours {
  id?: number;
  libelleCours?: string;
  syllabus?: ISyllabus | null;
  seances?: ISeance[] | null;
  ressources?: IRessource[] | null;
  matiere?: IMatiere | null;
  classe?: IClasse | null;
  professeur?: IProfesseur | null;
}

export class Cours implements ICours {
  constructor(
    public id?: number,
    public libelleCours?: string,
    public syllabus?: ISyllabus | null,
    public seances?: ISeance[] | null,
    public ressources?: IRessource[] | null,
    public matiere?: IMatiere | null,
    public classe?: IClasse | null,
    public professeur?: IProfesseur | null
  ) {}
}

export function getCoursIdentifier(cours: ICours): number | undefined {
  return cours.id;
}
