import {
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { PassArrayService } from "../services/pass-array.service";
import { Router } from "@angular/router";
import { NgbTooltipWindow } from "@ng-bootstrap/ng-bootstrap/tooltip/tooltip";
import { LoginComponent } from "src/app/shared/modals/login/login.component";

@Component({
  providers: [LoginComponent],
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  content: any;
  private modalRef: TemplateRef<any>;
  @ViewChild(LoginComponent, { static: false }) child;
  userName: any;
  flag = 0;
  navbarOpen = false;
  loggedInUser: any;
  accessToken: any;
  getToken: any;
  dropdownFlag: boolean = false;
  disableMyTrips: boolean = true;
  disableMyProfile: boolean = true;
  msg: any;

  constructor(
    private modalService: NgbModal,
    private login: LoginComponent,
    public dialog: MatDialog,
    private token: PassArrayService,
    public passArray: PassArrayService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getNameForHeader();
    this.accessToken = localStorage.getItem("accessToken");
    this.token.currentToken.subscribe((gst) => {
      this.getToken = gst;
      this.getNameForHeader();
    });
    this.token.currentLogoutFlag.subscribe((data) => (this.msg = data));

    if (this.getToken !== "") {
      console.log(this.disableMyTrips);
    }

    if (localStorage.getItem("loginUserDetails")) {
      this.loggedInUser = JSON.parse(localStorage.getItem("loginUserDetails"));
      this.passArray.passUserName(this.loggedInUser.customer_detail.name);
    }

    this.passArray.getNameOFUser.subscribe((name) => {
      this.userName = name;
    });
  }
  signin() {
    document.querySelector('.navbar-collapse').classList.remove('show');
    this.openDialog();
    // this.flag = 1;
    // this.login.openVerticallyCentered(LoginComponent);
  }

  // receiveMessage($event) {
  //   this.content = $event;
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "320px",
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  getNameForHeader() {
    if (localStorage.getItem("loginUserDetails")) {
      this.loggedInUser = JSON.parse(localStorage.getItem("loginUserDetails"));
      this.userName = this.loggedInUser.customer_detail.name;
      this.disableMyTrips = false;
      this.disableMyProfile = false;
    }
  }
  logoutDropDown() {
    // const HTMLElement = document.getElementsByClassName('demoCls')[0] as HTMLElement;
    this.dropdownFlag = !this.dropdownFlag;
    // if (this.dropdownFlag) {
    // HTMLElement.style.display = 'block';
    // } else {
    //   HTMLElement.style.display = 'none';
    // }
  }
  logout() {
    this.router.navigate(["/home"]);
    localStorage.removeItem("loginUserDetails");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("carterXAccessToken");
    this.token.passLogoutFlag("");
    this.userName = false;
    this.passArray.passUserName(false);
    this.disableMyTrips = true;
    this.disableMyProfile = true;
    setTimeout(()=>{location.reload();},300) 
    // location.reload();
  }

  reload() {
    if (window.location.pathname == "/home") {
      location.reload();
    }
  }

  // openModal() {
  //   const modalRef = this.modalService.open(LoginComponent);
  //   // modalRef.componentInstance.user = this.user;
  //   }

  // }

  logoOnclick() {
    this.router.url == "/home"
      ? location.reload()
      : this.router.navigate(["/home"]);
  }

  autoCloseForDropdown(event) {
    var target = event.target;
    if (!target.closest(".logout")) {
      this.dropdownFlag = false;
    }
  }
}
