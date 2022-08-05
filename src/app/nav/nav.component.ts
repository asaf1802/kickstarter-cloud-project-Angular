// shir
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  logOut(){
    this.authService.logout();
      this.router.navigate(['home']);




  }

  public slogo = "assets/small logo.png"

  constructor(public authService:AuthService, public router:Router) { }

  ngOnInit(): void {
  }

}
