import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBlockGrid } from './info-block-grid';

describe('InfoBlockGrid', () => {
  let component: InfoBlockGrid;
  let fixture: ComponentFixture<InfoBlockGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBlockGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBlockGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
