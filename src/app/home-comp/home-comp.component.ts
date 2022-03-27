import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-comp',
  templateUrl: './home-comp.component.html',
  styleUrls: ['./home-comp.component.scss']
})
export class HomeCompComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  navigate(pname: string) {

    this.router.navigate([pname])

  }
  ngOnInit(): void {
  }

}
