// shir
import { ProfileService } from './../profile.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email!:string;
  password!:string;
  firstName!:string;
  lastName!:string;
  errorMessage!:string;
  isError:boolean=false;
  userId!:any;

  constructor(private authService:AuthService, private router:Router,private ProfileService:ProfileService) { }
 
   
  onSubmit(){
    this.authService.SingUp(this.email,this.password).then(
      res =>{
        console.log('seccesful singUp');
        this.router.navigate(['/home']);
        /*
        this.userId= res.user?.uid
        this.ProfileService.addUser(this.userId,this.email,this.firstName,this.lastName);
        */
      }
    ).catch(
      err =>{
        console.log(err);
        this.isError = true;
        this.errorMessage=err.message;
        switch (err.code) {
                case "auth/invalid-email":{
                  this.errorMessage = "The email address is badly formatted.";
                  break;
                }
                case "auth/email-already-in-use":{
                  this.errorMessage = "The email address is already in use by another account.";
                  break;
                }
                case "auth/weak-password": {
                  this.errorMessage = "Password should be at least 6 characters.";
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
  
  ngOnInit(): void {
  }

}
