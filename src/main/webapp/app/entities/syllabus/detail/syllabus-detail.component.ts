import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISyllabus } from '../syllabus.model';

@Component({
  selector: 'jhi-syllabus-detail',
  templateUrl: './syllabus-detail.component.html',
})
export class SyllabusDetailComponent implements OnInit {
  syllabus: ISyllabus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ syllabus }) => {
      this.syllabus = syllabus;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
