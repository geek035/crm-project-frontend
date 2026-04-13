import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBlockDate } from './info-block-date';

describe('InfoBlockDate', () => {
  let component: InfoBlockDate;
  let fixture: ComponentFixture<InfoBlockDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBlockDate],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBlockDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
