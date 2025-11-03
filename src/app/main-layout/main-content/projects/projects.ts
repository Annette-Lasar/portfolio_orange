import { Component } from '@angular/core';
import { FrontendProjects } from './frontend-projects/frontend-projects.js';
import { BackendProjects } from './backend-projects/backend-projects.js';
import { PageContentService } from '../../../shared/services/page-content.service.js';

@Component({
  selector: 'port-projects',
  imports: [FrontendProjects, BackendProjects],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
constructor(public pageContentService: PageContentService) {}
}
