import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate-header',
  templateUrl: './corporate-header.component.html',
  styleUrls: ['./corporate-header.component.scss']
})
export class CorporateHeaderComponent implements OnInit {

  navbarOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
