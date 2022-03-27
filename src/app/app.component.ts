import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fypWebapp';

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.getPaths()
  }
  cPage: any;

  getPaths() {
    //   this.cPage = this.router.url
    //   alert(this.cPage)
    this.cPage = this.location.path()
  
  }

  ngOnInit(){
    this.getPaths()
  }
    



}
