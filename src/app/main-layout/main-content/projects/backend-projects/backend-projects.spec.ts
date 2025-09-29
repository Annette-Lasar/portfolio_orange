import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendProjects } from './backend-projects';

describe('BackendProjects', () => {
  let component: BackendProjects;
  let fixture: ComponentFixture<BackendProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
