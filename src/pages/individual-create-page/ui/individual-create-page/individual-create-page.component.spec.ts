import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCreatePage } from './individual-create-page.component';

describe('IndividualCreatePage', () => {
  let component: IndividualCreatePage;
  let fixture: ComponentFixture<IndividualCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualCreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
