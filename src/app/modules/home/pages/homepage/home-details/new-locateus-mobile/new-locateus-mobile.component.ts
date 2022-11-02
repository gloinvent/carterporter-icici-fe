import { Component, OnInit } from '@angular/core';
import { HomeCitywiseCostService } from '../../../../../../core/services/home-citywise-cost/home-citywise-cost.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-locateus-mobile',
  templateUrl: './new-locateus-mobile.component.html',
  styleUrls: ['./new-locateus-mobile.component.scss']
})
export class NewLocateusMobileComponent implements OnInit {

  constructor(
    public citycost: HomeCitywiseCostService,
    private route: ActivatedRoute,
  ) { }

  item: any;
  location_array: any = [];
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.item = params['item'];
    });
    this.citycost.getLocateUsMobile().subscribe(data => {
      console.log(data);
      this.location_array = data['locations'];
      debugger
      console.log(this.location_array);
      console.log(this.location_array[0][this.item]);
    });
  }

  OnChanges() {
    this.citycost.getLocateUsMobile().subscribe(data => {
      this.location_array = data['locations'];
    });
  }

  backBtn() {
    window.history.back();
  }

}
