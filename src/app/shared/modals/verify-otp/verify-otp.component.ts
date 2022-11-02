import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { apis } from '../../../config/apis';
import { PassFlagService } from '../../../core/services/passFlagService/pass-flag.service';
import { CrudService } from '../../../core/services/crud.service';
import { PassArrayService } from 'src/app/core/services/pass-array.service';


@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  otpForm: FormGroup;
  loginData: any;
  otpData: any;
  res: any;
  loggedInUser: any;
  loginFlag: any = 0;
  accesToken: any;
  passToken: any;
  otp: any;
  disableButton: boolean = true;
  loginRes: any;


  constructor(private modalService: NgbModal, public dialogRef: MatDialogRef<VerifyOtpComponent>, public dialog: MatDialog,
    private fb: FormBuilder, public getLoginData: PassFlagService, public crudService: CrudService,
    private token: PassArrayService, private _snackbar: MatSnackBar) { }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    this.otpForm.valueChanges.subscribe(value => {
      this.otp = value;
      if (this.otp.otp.length > 0) {
        this.disableButton = false;
      } else {
        this.disableButton = true;
      }
    }
    )
    this.loginData = this.getLoginData.getOption();
    this.token.currentGst.subscribe(gst => this.passToken = gst);
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  onSubmit() {
    this.createForm();
    this.crudService.post(apis.VERIFY_OTP, this.otpData.value).subscribe(
      response => {
        this.res = response;
        if (this.res.status === true) {
          this.loginFlag = 1;
          this.loggedInUser = this.res.customer_detail.name;
          this.token.passUserName(this.loggedInUser);
          const key = 'loginUserDetails';
          localStorage.setItem(key, JSON.stringify(this.res));
          const obj = {
            client_id: this.res.customer_detail.client_id,
            client_secret: this.res.customer_detail.client_secret,
            grant_type: 'client_credentials'
          }
          this.accessTokenApi(obj);
          localStorage.setItem("accessTokenObj", JSON.stringify(obj));
        } else if(this.res.status === false) {
          this._snackbar.open("Invalid OTP", 'X', {
            duration: 3000, verticalPosition: 'top'
          });
        }
      });
  }
  createForm() {
    let countryCode = localStorage.getItem('countryCode');

    this.otpData = this.fb.group({
      otp: [this.otpForm.get('otp').value],
      mobile: [this.loginData.mobile],
      id_country_code: [countryCode]
    });
  }
  accessTokenApi(obj) {
    this.crudService.getToken(apis.GET_LOGIN_TOKEN, obj).subscribe(
      response => {
        this.accesToken = response;
        if (this.accesToken) {
          const key = 'accessToken';
          localStorage.setItem(key, this.accesToken.access_token);
          this.token.passToken(this.accesToken.access_token);

          localStorage.setItem('carterXAccessToken',this.accesToken.access_token);

        }
      });
    this.onNoClick('Login');
    this.token.newEventFordata('LoggedIn!');
  }

  login() {
    let obj = JSON.parse(localStorage.getItem('userLoginNumber'));

    this.crudService.post(apis.USER_LOGIN, obj).subscribe(
      response => {
        this.loginRes = response;
        if (this.loginRes.status) {
          this._snackbar.open(this.loginRes.otp_response.message.message, 'X', {
            duration: 4000, verticalPosition: 'top'
          });
        } else {
          this._snackbar.open(this.loginRes.message, 'X', {
            duration: 4000, verticalPosition: 'top'
          });
        }
      });
  }

  getInfoKey(key: string): string {
    return key;
  }
}
