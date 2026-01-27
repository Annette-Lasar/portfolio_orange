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

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof Scroll) {
        console.log('ROUTER scroll event:', e.position);
      }
    });
  }
}
