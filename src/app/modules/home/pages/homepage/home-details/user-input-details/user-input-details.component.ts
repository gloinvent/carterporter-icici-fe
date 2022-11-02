import { Component, OnInit, HostListener, ViewChild, Output } from '@angular/core';
import { PassArrayService } from 'src/app/core/services/pass-array.service';
import { LoginComponent } from 'src/app/shared/modals/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-input-details',
  templateUrl: './user-input-details.component.html',
  styleUrls: ['./user-input-details.component.scss'],
  providers: [LoginComponent],
})
export class UserInputDetailsComponent implements OnInit {

  flag: any;
  flagCity: any;
  tabFlag: any;
  scrollDown: any;
  disableMyTrips: boolean = true;
  getToken: any;
  accessToken: any;

  constructor(
    public passArray: PassArrayService,
    public dialog: MatDialog,
    private token: PassArrayService,
  ) { }


  @ViewChild(LoginComponent, { static: false }) child;
  // @HostListener('window:scroll', ['$event'])
  // doSomething(event) {
  //   this.scrollDown = window.pageYOffset;
  //   if (window.pageYOffset > 200) {
  //     var element = document.getElementById("nav")
  //     element.classList.add("stickyNav");
  //     element.classList.remove("beforeNav");
  //     document.getElementById("signPart").classList.remove('d-none');
  //     document.getElementById("signPart").classList.add('d-block');
  //   }
  //   if (window.pageYOffset < 200) {
  //     var element = document.getElementById("nav")
  //     element.classList.remove("stickyNav")
  //     element.classList.add("beforeNav");
  //     document.getElementById("signPart").classList.add('d-none');
  //     document.getElementById("signPart").classList.remove('d-block');
  //   }
  // }

  // @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.toggelFunction(2);
    this.selectTab(1);
    this.accessToken = localStorage.getItem('accessToken');
    this.token.currentToken.subscribe(gst => {
      this.getToken = gst;
      this.getNameForHeader();
      console.log("this.getToken", this.getToken);
    });
    if (this.getToken !== '') {
      console.log(this.disableMyTrips);
    }
  }

  loggedInUser: any;
  userName: any = 'Sign In';
  getNameForHeader() {
    if (localStorage.getItem('loginUserDetails')) {
      this.disableMyTrips = false;
      this.loggedInUser = JSON.parse(localStorage.getItem('loginUserDetails'));
      this.userName = this.loggedInUser.customer_detail.name;
    }

  }

  toggelFunction(num) {
    this.flag = num;
    console.log("carterXtypeFlag", num);
    localStorage.setItem("carterXtypeFlag", num);
    this.passArray.passCarterXType(num);
  }

  // get tab value
  numValue: any;
  selectTab(num) {
    this.numValue = num;
    scrollTo(0, 0);
  }

  signin() {
    var element = document.getElementById("nav")
    element.classList.add("stickyNav");
    element.classList.remove("beforeNav");
    this.openDialog();
    if (window.pageYOffset > 200) {
      scrollTo(0, 201);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  reload() {
    if (window.location.pathname != '/booking-confirmation') {
      location.reload();
    }
  }

}

