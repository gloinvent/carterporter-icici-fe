import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CrudService } from '../../../core/services/crud.service';
import { apis } from '../../../config/apis';
import { MatSnackBar } from '@angular/material';
import { PassArrayService } from 'src/app/core/services/pass-array.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  res: any;
  passToken: any;
  mobileNo: any;
  disableButton: boolean = true;
  countryCode: any;
  showCountryCode: any;
  selectedCC: any = 95;

  constructor(private modalService: NgbModal, public dialogRef: MatDialogRef<RegisterComponent>, private fb: FormBuilder,
               private crudService: CrudService,  private _snackbar: MatSnackBar,  public dialog: MatDialog,
               private token: PassArrayService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(13),
        Validators.pattern('[0-9]+')
      ]],
      email: ['', Validators.required],
      id_country_code: ['+91']
    });

    this.registerForm.valueChanges.subscribe( value => {
      this.mobileNo = value;
      if (this.mobileNo.mobile.length > 6 && this.mobileNo.mobile.length < 14 && !this.registerForm.invalid) {
        this.disableButton = false;
      } else {
        this.disableButton = true;
      }
    }
      )
    this.token.currentGst.subscribe(gst => this.passToken = gst );
    this.getCountryCode();

    localStorage.setItem('countryCode', this.selectedCC);
  }

  getCountryCode() {
    this.crudService.get(apis.COUNTRY_CODES).subscribe(
      data => {
        this.countryCode = data;
        this.showCountryCode = this.countryCode.codes;
      });
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  selectedCountryCode() {
    this.selectedCC = this.registerForm.value.id_country_code;
    this.selectedCC =  this.selectedCC.id_country_code;
    localStorage.setItem('countryCode', this.selectedCC);
  }

  register() {

    let obj = {
    name: this.registerForm.get('name').value,
    email: this.registerForm.get('email').value,
    mobile: this.registerForm.get('mobile').value,
    other_comments:"",
    date_of_birth:"",
    address_line_1:"",
    address_line_2:"",
    area:"",
    pincode:"",
    gender: 0,
    id_country_code: this.selectedCC,
    landmark:"",
    building_number:"",
    building_restriction:"",
    customer_document: ""
    }

    this.crudService.postFormdata(apis.USER_REGISTER, obj).subscribe(
      response => {
        this.res = response;
        if (this.res.status) {
          this._snackbar.open(this.res.message, 'X', {duration: 3000, verticalPosition: 'top'
          });
          this.onNoClick('loginFromRegister');
        } else {
          this._snackbar.open(this.res.message, 'X', {duration: 4000, verticalPosition: 'top'
          });
        }
      },
      err => {
        
      });
  }

}
