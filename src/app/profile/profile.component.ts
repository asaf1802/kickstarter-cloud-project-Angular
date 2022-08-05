// asaf
import { AuthService } from './../auth.service';
import { ProfileService } from './../profile.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  panelOpenState = false;
  projects$!: Observable<any | null>;
  userId!:any;
  projects:any;

  constructor(private ProfileService:ProfileService, public authServise:AuthService, public router:Router) { }

  deleteProject(project_id:string){
    this.ProfileService.deleteProject(project_id).subscribe((data) =>{
      this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
        this.router.navigate(['profile']))
      
    })
  }

  

  ngOnInit(): void {
    this.authServise.getUser().subscribe(
      user =>{
        this.userId = user?.uid;
         this.ProfileService.getProject(this.userId).subscribe((data) =>{
          this.projects = data; 

      }
        
    )
  }
    )
}
}