import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-howitswork-mobile',
  templateUrl: './new-howitswork-mobile.component.html',
  styleUrls: ['./new-howitswork-mobile.component.scss']
})
export class NewHowitsworkMobileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  img: any;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.img = params['item'];
    });
  }

  backBtn() {
    window.history.back();
  }

}
