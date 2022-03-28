import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.scss']
})
export class TrainModelComponent implements OnInit {

  constructor() {
    this.containerName = 'uploadfile'
  }

  containerName: string;

  shiftViews(name: string) {
    this.containerName = name
  }

  ngOnInit(): void {
  }

}
