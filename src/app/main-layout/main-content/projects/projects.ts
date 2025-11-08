import { Component } from '@angular/core';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { Project } from './project/project.js';

@Component({
  selector: 'port-projects',
  imports: [Project],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
constructor(public pageContentService: PageContentService) {}
}
