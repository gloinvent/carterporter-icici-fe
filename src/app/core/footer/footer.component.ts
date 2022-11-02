import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  informationRouting(navigateTo: string): void {
    this.router.navigate([]).then((result) => {
      window.open("/information/" + navigateTo, "_blank");
    });
  }

  logoOnclick() {
    this.router.url == "/home"
      ? location.reload()
      : this.router.navigate(["/home"]);
  }
}
