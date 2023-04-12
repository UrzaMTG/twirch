import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-aboutDialog',
  templateUrl: './aboutDialog.component.html',
  styleUrls: ['./aboutDialog.component.scss']
})
export class AboutDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AboutDialogComponent>) { }

  ngOnInit() {
  }

}
