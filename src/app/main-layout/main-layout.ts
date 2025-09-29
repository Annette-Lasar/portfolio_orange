import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../shared/components/footer/footer.js';

@Component({
  selector: 'port-main-layout',
  imports: [RouterOutlet, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
