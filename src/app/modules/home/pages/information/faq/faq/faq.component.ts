import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  navbarItem = [
    {
      icon: './../../../../../../../assets/icons/faq/Registration.png',
      name: 'Registration'
    },
    {
      icon: './../../../../../../../assets/icons/faq/Account Related.png',
      name: 'Account Related'
    },
    {
      icon: './../../../../../../../assets/icons/faq/Order Related.png',
      name: 'Order Related'
    },
    {
      icon: './../../../../../../../assets/icons/faq/Payment.png',
      name: 'Payment'
    },
    {
      icon: './../../../../../../../assets/icons/faq/Pickup and Delivery Related.png',
      name: 'Pickup and Delivery Related'
    },
    {
      icon: './../../../../../../../assets/icons/faq/Insurance Related.png',
      name: 'Insurance Related'
    },
    {
      icon: './../../../../../../../assets/icons/faq/Customer Related.png',
      name: 'Customer Related'
    },
  ];

  selected_Nav_Item: string = "Registration";
  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  setActive(nav_Item) {
    this.selected_Nav_Item = nav_Item;
  }

}
