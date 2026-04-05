import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCardPage } from './individual-card-page.component';

describe(IndividualCardPage.name, () => {
  let component: IndividualCardPage;
  let fixture: ComponentFixture<IndividualCardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualCardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
