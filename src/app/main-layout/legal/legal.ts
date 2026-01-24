import { Component } from '@angular/core';
import { Menu } from '../../shared/components/menu/menu';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'port-legal',
  imports: [Menu, RouterModule],
  templateUrl: './legal.html',
  styleUrl: './legal.scss'
})
export class Legal {

}
