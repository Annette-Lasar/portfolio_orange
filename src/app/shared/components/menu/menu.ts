import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PageContentService } from '../../services/page-content.service.js';

@Component({
  selector: 'port-menu',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  constructor(public pageContentService: PageContentService) {}
}
