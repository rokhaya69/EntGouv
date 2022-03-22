import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContenuDetailComponent } from './contenu-detail.component';

describe('Contenu Management Detail Component', () => {
  let comp: ContenuDetailComponent;
  let fixture: ComponentFixture<ContenuDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenuDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ contenu: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ContenuDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ContenuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load contenu on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.contenu).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
