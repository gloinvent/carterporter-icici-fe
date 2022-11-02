import { Component, OnInit } from '@angular/core';
import { HomeCitywiseCostService } from '../../../../../../core/services/home-citywise-cost/home-citywise-cost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locate-us-airport',
  templateUrl: './locate-us-airport.component.html',
  styleUrls: ['./locate-us-airport.component.scss']
})
export class LocateUsAirportComponent implements OnInit {

  location_array: any;

  show_array: any = [];
  current_index: any = 0;


  constructor(public citycost: HomeCitywiseCostService, private router: Router) { }

  ngOnInit() {
    this.getCost();
  }

  getCost() {
    this.citycost.getLocateUs().subscribe(data => {
      this.location_array = data['locations'];
      console.log(data)
      for (let i = 0; i < 3; i++) {
        this.current_index = i;
        this.show_array.push(this.location_array[i]);
      }
      console.log("show_array",this.show_array)
      console.log("this.location_array.length", this.location_array.length);
      this.array_total_index = this.location_array.length - 1;
    });
  }

  array_total_index: any;
  add() {
    this.current_index = this.current_index < this.location_array.length - 1 ? this.current_index + 1 : this.current_index;
    console.log("this.current_index", this.current_index);
    this.show_array.shift();
    this.show_array.push(this.location_array[this.current_index]);
  }

  array_shift_index: any = 0;
  sub() {
    console.log("this.current_index", this.current_index);
    this.show_array.pop();
    this.show_array.splice(0, 0, this.location_array[this.current_index - 3]);
    this.current_index = this.current_index > 0 ? this.current_index - 1 : this.current_index;
  }

}
