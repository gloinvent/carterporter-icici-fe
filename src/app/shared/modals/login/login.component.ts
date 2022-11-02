import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { VerifyOtpComponent } from "../verify-otp/verify-otp.component";
import { CrudService } from "../../../core/services/crud.service";
import { apis } from "../../../config/apis";
import { PassFlagService } from "../../../core/services/passFlagService/pass-flag.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [RegisterComponent, VerifyOtpComponent]
})
export class LoginComponent implements OnInit {
  @Input() type = "text";
  loginForm: FormGroup;
  countryCode: any;
  passLoginData: any;
  disableButton: boolean = true;
  mobileNo: any;
  checkNo: any = [];
  loginRes: any;
  selectedCC: any = 95;
  showCountryCode: any;

  searchText;
  selectedCountry;

  constructor(
    private modalService: NgbModal,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private crudService: CrudService,
    private passData: PassFlagService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      mobile: [
        "",
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(13),
          Validators.pattern("[0-9]+")
        ]
      ],
      id_country_code: ["+91"]
    });
    this.loginForm.valueChanges.subscribe(value => {
      this.mobileNo = value;
      console.log(this.mobileNo);
      if (this.mobileNo.mobile.length > 6 && this.mobileNo.mobile.length < 14) {
        this.disableButton = false;
      } else {
        this.disableButton = true;
      }
    });

    this.getCountryCode();
    localStorage.setItem("countryCode", this.selectedCC);
  }

  getCountryCode() {
    this.crudService.get(apis.COUNTRY_CODES).subscribe(data => {
      this.countryCode = data;
      this.showCountryCode = this.countryCode.codes;
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {
    this.openDialog();
  }

  openDialogOtp(): void {
    const dialogRef = this.dialog.open(VerifyOtpComponent, {
      width: "300px"
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Back": {
          break;
        }

        case "Login": {
          this.onNoClick();
          break;
        }

        default: {
          break;
        }
      }
      console.log("vefiyotp closed");
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: "300px",
      panelClass : "register-modal"
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "loginFromRegister": {
          break;
        }
        case "closeRegister": {
          break;
        }
        case "privacyTerms": {
          this.onNoClick();
          break;
        }
      }
    });
  }

  selectedCountryCode() {
    this.selectedCC = this.loginForm.value.id_country_code;
    this.selectedCC = this.selectedCC.id_country_code;
    localStorage.setItem("countryCode", this.selectedCC);
  }

  login() {
    let obj = {
      mobile: this.loginForm.value.mobile,
      id_country_code: this.selectedCC
    };
    localStorage.setItem("userLoginNumber", JSON.stringify(obj));
    this.crudService.post(apis.USER_LOGIN, obj).subscribe(response => {
      this.passLoginData = this.loginForm.value;
      this.passData.setOption(this.passLoginData);
      this.loginRes = response;
      console.log("this.loginRes",this.loginRes);
      if (this.loginRes.status) {
        this.openDialogOtp();
      } else {
        this._snackbar.open(this.loginRes.message, "X", {
          duration: 4000,
          verticalPosition: "top"
        });
      }
    });
  }
}
