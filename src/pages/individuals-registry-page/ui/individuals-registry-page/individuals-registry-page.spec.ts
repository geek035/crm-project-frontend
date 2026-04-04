import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsRegistryPage } from './individuals-registry-page';

describe('IndividualsRegistryPage', () => {
  let component: IndividualsRegistryPage;
  let fixture: ComponentFixture<IndividualsRegistryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualsRegistryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualsRegistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
