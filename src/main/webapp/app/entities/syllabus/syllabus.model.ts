import { IProgramme } from 'app/entities/programme/programme.model';

export interface ISyllabus {
  id?: number;
  syllabus?: string;
  programme?: IProgramme | null;
}

export class Syllabus implements ISyllabus {
  constructor(public id?: number, public syllabus?: string, public programme?: IProgramme | null) {}
}

export function getSyllabusIdentifier(syllabus: ISyllabus): number | undefined {
  return syllabus.id;
}
