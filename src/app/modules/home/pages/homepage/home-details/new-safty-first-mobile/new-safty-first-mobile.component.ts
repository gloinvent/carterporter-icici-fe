import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-safty-first-mobile',
  templateUrl: './new-safty-first-mobile.component.html',
  styleUrls: ['./new-safty-first-mobile.component.scss']
})
export class NewSaftyFirstMobileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  backBtn() {
    window.history.back();
  }

}
