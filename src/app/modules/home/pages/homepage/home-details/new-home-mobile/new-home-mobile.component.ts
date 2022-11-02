import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PassArrayService } from '../../../../../../core/services/pass-array.service';
import { LoginComponent } from 'src/app/shared/modals/login/login.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-new-home-mobile',
  templateUrl: './new-home-mobile.component.html',
  providers: [LoginComponent],
  styleUrls: ['./new-home-mobile.component.scss'],
})
export class NewHomeMobileComponent implements OnInit {

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.show_dropdown = false;
  }

  constructor(
    public router: Router,
    public passArray: PassArrayService,
    private login: LoginComponent,
    public dialog: MatDialog,
  ) { }

  userName: any;
  getToken: any;


  selected_image: any = 'Airport Transfer - Departure';
  source_array: any = ['Airport Transfer - Departure',
    'Airport Transfer - Arrival', 'Cargo Transfer'
  ]
  // 'Air Asia Flyporter'

  ngOnInit() {
    this.getNameForHeader();
    this.passArray.getNameOFUser.subscribe(
      name => {
        this.userName = name
      }
    );
    this.passArray.currentToken.subscribe(gst => {
      this.getToken = gst;
      this.getNameForHeader();
    });
  }

  show_dropdown: boolean = false;
  showDropDown(event) {
    event.stopPropagation()
    this.show_dropdown = !this.show_dropdown;
  }

  open() {
    
  }

  selectItem(value) {
    this.selected_image = value;
    this.show_dropdown = !this.show_dropdown;
    this.router.navigate(['/how-its-work'], { queryParams: { item: value } });
  }

  locateUs(item) {
    this.router.navigate(['/locate-us'], { queryParams: { item: item } });
  }

  loggedInUser: any;
  disableMyTrips: any;
  disableMyProfile: any;
  getNameForHeader() {
    if (localStorage.getItem('loginUserDetails')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loginUserDetails'));
      console.log(this.loggedInUser)
      this.userName = this.loggedInUser.customer_detail.name;
      this.disableMyTrips = false;
      this.disableMyProfile = false;
    }

  }


  signin() {
    this.openDialog();
    // this.flag = 1;
    // this.login.openVerticallyCentered(LoginComponent);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '320px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  navi(){
    window.open("https://www.carterporter.in/")
  }

}
