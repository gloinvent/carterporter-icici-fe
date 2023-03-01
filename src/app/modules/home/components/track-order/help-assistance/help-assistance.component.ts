import { PassArrayService } from "src/app/core/services/pass-array.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CrudService } from "src/app/core/services/crud.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { apis } from "src/app/config/apis";

@Component({
  selector: "app-help-assistance",
  templateUrl: "./help-assistance.component.html",
  styleUrls: ["./help-assistance.component.scss"],
})
export class HelpAssistanceComponent implements OnInit {
  helpForm: FormGroup;
  submitted: any = false;
  help_topics: any = [];
  file: any;
  id_customer: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { order_detail: any },
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<HelpAssistanceComponent>,
    public crud: CrudService,
    public ngxSpinner: NgxSpinnerService,
    public _snackbar: MatSnackBar,
    public token: PassArrayService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.get_ticket_topics();
    let login = JSON.parse(localStorage.loginUserDetails);

    this.id_customer = login.customer_detail["id_customer"];
  }

  // initializeForm
  initializeForm() {
    this.helpForm = this.fb.group({
      help_type: ["", [Validators.required]],
      help_comments: ["", [Validators.required]],
      help_files: [""],
    });
  }

  // form controll onclick
  handleDropdownEvent(type, value) {
    this.helpForm.controls["help_type"].setValue(value);
  }

  // get Ticket topics
  get_ticket_topics() {
    this.crud.get(apis.GET_TICKET_TOPICS).subscribe((res: any) => {
      if (res.status) {
        this.help_topics = res.result.topic;
      }
    });
  }

  // verify_uploded_file
  verify_uploded_file(files) {
    console.log()
    let extension_array = [
      "PNG",
      "jpeg",
      "pdf",
      "jpg",
      "doc",
      "heif",
      "hevc",
      "mov",
      "mp4",
      "m4v",
    ];
    let accepted_file_array = [];
    let arr = Object.values(files);
    arr.map((file, index) => {
      if(file['size'] > 10000000){
        console.log(file['size'],'file details');
        this.helpForm.controls["help_files"].setValue("");
        this.printToastMsg('File size should be less then 10 MB');
        return 0;
      }else{
        console.log(file,'file details');
        let file_extention = file["name"].split(".");
        let cnt = 0;
        extension_array.map((res) => {
          if (file_extention.length != 0) {
            file_extention.map((res2) => {
              if (res.toUpperCase() == res2.toUpperCase()) {
                cnt += 1;
                accepted_file_array.push(file);
                // this.file = {...files.item(index)}
                this.file = files;
              }
            });
          }
        });
      }
    });
    if (accepted_file_array.length == 0) {
      this.helpForm.controls["help_files"].setValue("");
      this.printToastMsg('Accepted Format : png, jpeg, jpg, pdf, mov, mp4, m4v')
    } else {
      // Object.map(this.files)
    }
  }

  create_ticket() {
    this.submitted = true;

    this.ngxSpinner.show();
    let extension_array = [
      "PNG",
      "jpeg",
      "pdf",
      "jpg",
      "doc",
      "heif",
      "hevc",
      "mov",
      "mp4",
      "m4v",
    ];
    var form_data = new FormData();
    // form_data.append("filename", this.file.name);
    form_data.append("comment", this.helpForm.get("help_comments").value);
    form_data.append("id_customer", this.id_customer);
    form_data.append("order_id", this.data.order_detail.order.id_order);
    form_data.append("topic_id", this.helpForm.get("help_type").value.topic_id);
    form_data.append("order_number", this.data.order_detail.order.order_number);
    let arr = [];

    this.file ? (arr = Object.values(this.file)) : null;
    if (arr.length != 0) {
      arr.map((res: any, index) => {
        let file_extention = res["name"].split(".");
        if (file_extention.length != 0) {
          file_extention.map((res2) => {
            extension_array.map((res3) => {
              if (res3.toUpperCase() == res2.toUpperCase()) {
                form_data.append("files[]", this.file.item(index));
              }
            });
          });
        }
      });
    }

    this.crud.postFormdataUploadImage2(apis.CREATE_TICKET, form_data).subscribe(
      (res: any) => {
        if (res.status) {
          this.help_topics = res.result.topic;
          this.printToastMsg(res.result.msg);
          this.dialogRef.close();
          this.token.callTrackOrder.next("success");
        } else {
          this.printToastMsg(res.msg);
          this.ngxSpinner.hide();
        }
      },
      (err) => {
        this.ngxSpinner.hide();
      }
    );
  }

  printToastMsg(msg) {
    this._snackbar.open(msg, "X", {
      duration: 5000,
      verticalPosition: "top",
      panelClass: "custom-snackbar",
    });
  }
}
