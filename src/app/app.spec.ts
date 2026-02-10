import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from '@widgets/header';

import { App } from './app.js';

describe(App.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Header],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
