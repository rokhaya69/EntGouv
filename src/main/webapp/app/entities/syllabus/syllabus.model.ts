import { ICours } from 'app/entities/cours/cours.model';
import { IProgramme } from 'app/entities/programme/programme.model';

export interface ISyllabus {
  id?: number;
  syllabus?: string;
  cours?: ICours | null;
  programme?: IProgramme | null;
}

export class Syllabus implements ISyllabus {
  constructor(public id?: number, public syllabus?: string, public cours?: ICours | null, public programme?: IProgramme | null) {}
}

export function getSyllabusIdentifier(syllabus: ISyllabus): number | undefined {
  return syllabus.id;
}
