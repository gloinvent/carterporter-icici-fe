import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-luggage-guide',
  templateUrl: './luggage-guide.component.html',
  styleUrls: ['./luggage-guide.component.scss']
})
export class LuggageGuideComponent implements OnInit {

  constructor(private modalService: NgbModal, public dialogRef: MatDialogRef<LuggageGuideComponent>,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
