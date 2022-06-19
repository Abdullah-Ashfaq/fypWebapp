import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { TestModelComponent } from '../test-model/test-model.component';

@Component({
  selector: 'app-home-comp',
  templateUrl: './home-comp.component.html',
  styleUrls: ['./home-comp.component.scss']
})
export class HomeCompComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }

  navigate(pname: string) {

    this.router.navigate([pname])

  }

  testModel() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '580px';
    dialogConfig.width = '100%';

    this.dialog.open(TestModelComponent, dialogConfig);


  }


  ngOnInit(): void {
    // this.testModel()
  }

}
