import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SyllabusDetailComponent } from './syllabus-detail.component';

describe('Syllabus Management Detail Component', () => {
  let comp: SyllabusDetailComponent;
  let fixture: ComponentFixture<SyllabusDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SyllabusDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ syllabus: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SyllabusDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SyllabusDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load syllabus on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.syllabus).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
