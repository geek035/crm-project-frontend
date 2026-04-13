import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBlockText } from './info-block-text';

describe('InfoBlockText', () => {
  let component: InfoBlockText;
  let fixture: ComponentFixture<InfoBlockText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBlockText],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBlockText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
