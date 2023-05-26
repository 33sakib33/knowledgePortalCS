import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  
  totalSells : number = 12;
  totalBuys !: any;
  totalIncome : number = 20000;
  totalMoneySpent:number = 550000;
  recentBids!:any;
  show :number = 0;
  click : boolean = false;

  constructor(private router:Router) { }

  userdata!:any;
  authenticated : boolean = false;

  ngOnInit(): void {

  }

  editProfile()
  {
    this.router.navigate(['../editProfile']);
  }
  


}