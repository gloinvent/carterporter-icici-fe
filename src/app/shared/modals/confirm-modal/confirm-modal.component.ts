import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PassArrayService } from 'src/app/core/services/pass-array.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  mes: any;

  constructor(private modalService: NgbModal, public dialogRef: MatDialogRef<ConfirmModalComponent>
              ,public passArray: PassArrayService,public spinnerservice:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.passArray.currentCancel.subscribe(mes => this.mes = mes);
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelOrder() {
    // this.spinnerservice.show()

    this.passArray.passCancelFlag(99);
    this.onNoClick();
  }
}
