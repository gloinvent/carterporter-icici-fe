import { Component, OnInit } from '@angular/core';
import { LuggageGuideComponent } from '../../../../shared/modals/luggage-guide/luggage-guide.component';
import { PickAirportService } from '../../../../core/services/pick-airport/pick-airport.service';
import { apis } from '../../../../config/apis';

declare var $:any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  comment: any;

  constructor() { }

  ngOnInit() {
  }

  getComment(value){
    console.log(value);
    this.comment = value;
  }


  twitterValue:boolean;
  shareOnTwitter(value){
    let url;
    this.twitterValue = !this.twitterValue;
    console.log(this.twitterValue);
    if(this.twitterValue === true){
      url = "https://twitter.com/intent/tweet?text="+this.comment;
      window.open(url, '_blank');
    }
  }

 FaceBookValue:boolean;
  shareOnFacebook(){
    let url;
    this.FaceBookValue = !this.FaceBookValue;
    console.log(this.FaceBookValue);
    if(this.FaceBookValue === true){
      url = "//www.facebook.com/dialog/share?app_id=669326993276680&href=https://www.carterporter.in/home&display=popup&quote="+this.comment;
      window.open(url, '_blank');
    }
  }

}
