import { Component, Input, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-help-details-content",
  templateUrl: "./help-details-content.component.html",
  styleUrls: ["./help-details-content.component.scss"],
})
export class HelpDetailsContentComponent implements OnInit {
  @Input() content_name: string;
  @Input() content: any;
  imgSrc: any;
  constructor() { }

  ngOnInit() {
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

}
