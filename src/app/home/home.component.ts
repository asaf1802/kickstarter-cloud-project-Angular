// asaf
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId:any;

  navivigateToTest(){
    if(this.userId){
      this.router.navigate(['model']);
    }else{
      this.router.navigate(['login']);


    }



  }

  constructor(public authServise:AuthService, public router:Router) { }

  ngOnInit(): void {
    this.authServise.getUser().subscribe(
      user =>{
        this.userId = user?.uid;
        console.log("USER ID:");
        console.log(this.userId);
      }
    )
  }

}
