import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MergedProject } from '../../../../../shared/interfaces/project.interface';
import { MergedContent } from '../../../../../shared/interfaces/merged-content.interface';

@Component({
  selector: 'port-project-detail',
  imports: [],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss'
})
export class ProjectDetail {
  imgPathPrefix: string = '../../../../../../img/projects/';
  iconPathSkillsPrefix: string = '../../../../../../icons/skills/';
  iconPathGeneralPrefix: string = '../../../../../../icons/general/';
  @Input() project!: MergedProject;
  @Input() content!: MergedContent;
  @Output() closeContainer = new  EventEmitter<void>();
  

  closeDetailView(): void {
    this.closeContainer.emit();
  }
}
