import { Component, OnInit } from '@angular/core';
import { GlobalMenuService } from '../../services/global-menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public globalMenuService: GlobalMenuService) {}

  ngOnInit() {}
}
