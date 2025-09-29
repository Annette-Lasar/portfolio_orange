import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { Menu } from '../../../shared/components/menu/menu.js';

@Component({
  selector: 'port-hero',
  imports: [CommonModule, MatButtonModule, Menu],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
  }
}
