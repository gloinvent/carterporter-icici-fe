import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corporate-footer',
  templateUrl: './corporate-footer.component.html',
  styleUrls: ['./corporate-footer.component.scss']
})
export class CorporateFooterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  informationRouting(navigateTo:string):void{
    this.router.navigate(['/information/'+navigateTo]);
  }
}
