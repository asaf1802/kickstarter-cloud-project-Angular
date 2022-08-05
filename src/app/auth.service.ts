// shir
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!:Observable<firebase.default.User|null>;

  SingUp(email:string,password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password);
  }
  
  login(email:string,password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    this.afAuth.signOut();
  }

  getUser():Observable<firebase.default.User|null>{
    return this.user;
  }

  constructor(private afAuth:AngularFireAuth,private router:Router) { 
    this.user = this.afAuth.authState;
  }
}
