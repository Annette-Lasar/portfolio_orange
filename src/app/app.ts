import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, Scroll } from '@angular/router';

@Component({
  selector: 'port-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolio');

}
