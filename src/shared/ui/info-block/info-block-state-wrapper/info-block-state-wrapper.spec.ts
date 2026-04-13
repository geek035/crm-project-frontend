import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBlockStateWrapper } from './info-block-state-wrapper';

describe('InfoBlockStateWrapper', () => {
  let component: InfoBlockStateWrapper;
  let fixture: ComponentFixture<InfoBlockStateWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBlockStateWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBlockStateWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
