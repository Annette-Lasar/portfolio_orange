import { Component } from '@angular/core';
import { Hero } from './hero/hero.js';
import { About } from './about/about.js';
import { Projects } from './projects/projects.js';
import { Feedback } from './feedback/feedback.js';
import { Cv } from './cv/cv.js';
import { Contact } from './contact/contact.js';
import { Menu } from '../../shared/components/menu/menu.js';

@Component({
  selector: 'port-main-content',
  imports: [Hero, About, Projects, Feedback, Cv, Contact, Menu],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
