import { Component, OnInit, HostListener } from '@angular/core';
import { HomeCitywiseCostService } from '../../../../../core/services/home-citywise-cost/home-citywise-cost.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-citywise-cost',
  templateUrl: './home-citywise-cost.component.html',
  styleUrls: ['./home-citywise-cost.component.scss']
})
export class HomeCitywiseCostComponent implements OnInit {

  citydetails: any;
  cityrate: any;
  imagesrc: any;
  indx: any;
  isCollapsed = true;
  toggleButton = 'VIEW ALL';
  carterXflag: any;

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.show_dropdown = false;
  }

  constructor(public citycost: HomeCitywiseCostService, private router: Router) { }

  selected_image: any = 'Airport Transfer - Departure';
  source_array: any = ['Airport Transfer - Departure',
    'Airport Transfer - Arrival', 'Cargo Transfer',
  ]

  ngOnInit() {
    this.getCost();
    this.carterXflag = localStorage
  }
  getCost() {
    this.citycost.getCityWiseCostDetails().subscribe(data => {
      this.citydetails = data;
      this.cityrate = this.citydetails.cityrate;
      console.log(this.citydetails);
      console.log(this.citydetails.cityrate);
    });
  }
  toggleButtonText(i: any) {
    this.indx = i;
    if (this.toggleButton === 'VIEW ALL') {
      this.toggleButton = 'VIEW LESS';
    } else {
      this.toggleButton = 'VIEW ALL';
    }
  }
  informationRouting(navigateTo: string): void {
    this.router.navigate([]).then(result => { window.open(navigateTo, '_blank'); });
  }

  show_dropdown: boolean = false;
  showDropDown(event) {
    this.show_dropdown = !this.show_dropdown;
    event.stopPropagation()
  }

  selectItem(value) {
    this.selected_image = value;
    this.show_dropdown = !this.show_dropdown;
  }

}
