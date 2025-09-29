import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PageContentService } from '../../../shared/services/page-content.service.js';

@Component({
  selector: 'port-cv',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './cv.html',
  styleUrl: './cv.scss',
})
export class Cv {
  constructor(public pageContentService: PageContentService) {}
}
