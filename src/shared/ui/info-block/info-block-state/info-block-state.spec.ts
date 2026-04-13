import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBlockState } from './info-block-state';

describe('InfoBlockStateWrapper', () => {
  let component: InfoBlockState;
  let fixture: ComponentFixture<InfoBlockState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBlockState],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBlockState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
