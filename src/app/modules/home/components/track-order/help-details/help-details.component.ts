import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { apis } from "src/app/config/apis";
import { CrudService } from "src/app/core/services/crud.service";

@Component({
  selector: "app-help-details",
  templateUrl: "./help-details.component.html",
  styleUrls: ["./help-details.component.scss"],
})
export class HelpDetailsComponent implements OnInit {
  navbarItem = [];
  selected_Nav_Item: string = "";
  content: any = [];
  imgSrc: any;
  data_not_available:any = false

  constructor(public crud: CrudService, public route: ActivatedRoute, public ngxSpinner:NgxSpinnerService) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.route.params.subscribe((res) => {
      res ? this.getTicketDetail(res.ticket_number) : null;
    });
  }

  setActive(nav_Item) {
    this.selected_Nav_Item = nav_Item.ticket_number;
    this.content = nav_Item;
  }

  process_image(str) {
    let list, list1 = [];
    // console.log(str);
    if (str) {
      list = (str.split(",").length != 0 ? str.split(",") : (str != "" ? [str] : []));
      if (str && list.length != 0) {
        if (
          list[0].split(".").pop() == "png" ||
          list[0].split(".").pop() == "jpeg" ||
          list[0].split(".").pop() == "jpg" ||
          list[0].split(".").pop() == "pdf" ||
          list[0].split(".").pop() == "mov" ||
          list[0].split(".").pop() == "mp4" ||
          list[0].split(".").pop() == "m4v"
        ) {
          list.map((res) => {
            list1.push((environment.baseUrl == 'https://hyd.carterx.in/index.php?' ? "https://hyd.carterx.in/uploads/ticket_images/" : "https://app.carterx.in/uploads/ticket_images/") + res);
          });
          return list1;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  getTicketDetail(order_id) {
    
    let login = JSON.parse(localStorage.loginUserDetails ?localStorage.loginUserDetails : null);

    // request body
    this.ngxSpinner.show();
    let reqBody = {
      order_id: order_id,
      id_customer: login ? login.customer_detail.id_customer : '',
    }
    this.crud
      .post(apis.FETCH_TICKET_DETAIL, reqBody)
      .subscribe((res: any) => {
        this.ngxSpinner.hide();
        if (res.status && res.result.complaint_list.length !=0) {
          this.navbarItem = res.result.complaint_list;
          this.selected_Nav_Item = res.result.complaint_list[0].ticket_number;
          this.content = res.result.complaint_list[0];
        }else{
          this.data_not_available = true
        }
      },(err)=> {this.ngxSpinner.hide();});
  }

}
