// shir
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  
  email!:string;
  password!:string;
  errorMessage!:string;
  isError:boolean=false;

  onSubmit(){
    this.auth.login(this.email,this.password).then(res =>{
          console.log(res);
          
          this.router.navigate(['/home']);
        }
        ).catch(
      err =>{
        console.log(err);
        this.isError = true;
        switch (err.code) {
                case "auth/invalid-email":{
                  this.errorMessage = "The email address is badly formatted.";
                  break;
                }
                case "auth/wrong-password":{
                  this.errorMessage = "The password is invalid or the user does not have a password.";
                  break;
                }
                case "auth/user-not-found": {
                  this.errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
                  break;
                }
                default: {
                  this.errorMessage = "Unexpected Error";
                  break;
                }
        }
      }
    )
  }
  
  constructor(private auth:AuthService,private router:Router ) { }

  ngOnInit(): void {
  }

}
