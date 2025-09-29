import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'port-about',
  imports: [CommonModule, MatTabsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit{
  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }
}
