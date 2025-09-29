import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendProjects } from './frontend-projects';

describe('FrontendProjects', () => {
  let component: FrontendProjects;
  let fixture: ComponentFixture<FrontendProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontendProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
