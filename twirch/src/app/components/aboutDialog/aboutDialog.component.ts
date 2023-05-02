import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import packageJson from '../../../../package.json';

@Component({
  selector: 'app-aboutDialog',
  templateUrl: './aboutDialog.component.html',
  styleUrls: ['./aboutDialog.component.scss']
})
export class AboutDialogComponent implements OnInit {
  public version: string = packageJson.version;

  constructor(public dialogRef: MatDialogRef<AboutDialogComponent>) { }

  ngOnInit() {
  }

}
