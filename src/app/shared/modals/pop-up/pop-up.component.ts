import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface infoDialogData{
  title?:string,
  notes:paragraphs[]
  link?:string
}
 interface paragraphs{
  paragraph:string
 }

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  popUpData:infoDialogData;
  constructor(@Inject(MAT_DIALOG_DATA) private data:infoDialogData) {
    this.popUpData = this.data;
  }

  ngOnInit() {
  }

}
