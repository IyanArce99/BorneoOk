import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  logo = "assets/images/logo-7.png"

  constructor() { }

  ngOnInit(): void {
  }

}
