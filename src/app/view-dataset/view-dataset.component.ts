import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-dataset',
  templateUrl: './view-dataset.component.html',
  styleUrls: ['./view-dataset.component.scss']
})
export class ViewDatasetComponent implements OnInit {

  constructor(
    private dialoge: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // console.log(this.data.open);

  }

  close() {
    this.dialoge.closeAll()
  }

  reviewIDs: any[] = []
  reviewText: any[] = []
  classLabels: any[] = []

  ngOnInit(): void {
  }

}
