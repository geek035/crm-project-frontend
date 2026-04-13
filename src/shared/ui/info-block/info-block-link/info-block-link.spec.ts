import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBlockLink } from './info-block-link';

describe('InfoBlockLink', () => {
  let component: InfoBlockLink;
  let fixture: ComponentFixture<InfoBlockLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBlockLink],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBlockLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
