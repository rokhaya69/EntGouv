import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContenu } from '../contenu.model';

@Component({
  selector: 'jhi-contenu-detail',
  templateUrl: './contenu-detail.component.html',
})
export class ContenuDetailComponent implements OnInit {
  contenu: IContenu | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contenu }) => {
      this.contenu = contenu;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
