import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faq-content',
  templateUrl: './faq-content.component.html',
  styleUrls: ['./faq-content.component.scss']
})
export class FaqContentComponent implements OnInit {


@Input() content:string
  constructor() { }

  ngOnInit() {
  }

}
