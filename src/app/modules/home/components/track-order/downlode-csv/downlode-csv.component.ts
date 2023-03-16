import { apis } from 'src/app/config/apis';
import { CrudService } from 'src/app/core/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-downlode-csv',
  templateUrl: './downlode-csv.component.html',
  styleUrls: ['./downlode-csv.component.scss']
})
export class DownlodeCsvComponent implements OnInit {

  from_date_datepicker:any
  to_date_datepicker:any
  showDate:any = []
  showToDate:any = []

  constructor(
    public dialogRef: MatDialogRef<DownlodeCsvComponent>,
    public crud:CrudService,
    public ngxSpinner: NgxSpinnerService,
    public _snackbar:MatSnackBar
  ) { 
    this.initialization();
  }

  ngOnInit() {

  }

  click(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  initialization() {
    this.from_date_datepicker = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (0), 10, 33, 30, 0);
    this.from_date_datepicker.setHours(0, 0, 0, 0);
    this.showDate = this.from_date_datepicker.toString().split(" ");
    this.to_date_datepicker = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (1), 10, 33, 30, 0);
    this.showToDate = this.to_date_datepicker.toString().split(" ");
  }

  datePickerOnChange(type){
    if(type === 1){
      this.showDate = this.from_date_datepicker.toString().split(" ");
      this.to_date_datepicker = new Date(new Date(this.from_date_datepicker).getFullYear(), new Date(this.from_date_datepicker).getMonth(), new Date(this.from_date_datepicker).getDate() + (1), 10, 33, 30, 0);
      this.showToDate = this.to_date_datepicker.toString().split(" ");
    }else if(type ===2){
      this.showToDate = this.to_date_datepicker.toString().split(" ");
    }
  }

  generate_csv_file(){
    let login = JSON.parse(localStorage.loginUserDetails);
    this.ngxSpinner.show();
    const reqBody = {
      "id_customer": login.customer_detail["id_customer"] ? login.customer_detail["id_customer"] : '', // required
      "start_date": new Date(this.from_date_datepicker), //not required
      "end_date":  new Date(this.to_date_datepicker),  //not required
      "corporate_orders": "1"  //required for corporate order only
    }

    this.crud.post(apis.DOWNLOAD_ORDERS,reqBody).subscribe((res:any)=>{
      if(res.status){
        const link = document.createElement('a');
        link.href = res.csv_path;
        link.download = res.csv_path;
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.printToastMsg(res.message)
        setTimeout(()=>{
          this.crud.post(apis.REMOVE_CSV_FILE,{file_path:res.csv_path}).subscribe((res1:any)=>{
            console.log(res1)
          })
        },100)
        this.dialogRef.close();
        
      }
      this.ngxSpinner.hide();
    },err=>{this.ngxSpinner.hide();})
  }

  printToastMsg(msg) {
    this._snackbar.open(msg, "X", {
      duration: 5000,
      verticalPosition: "top",
      panelClass: "custom-snackbar",
    });
  }



}
