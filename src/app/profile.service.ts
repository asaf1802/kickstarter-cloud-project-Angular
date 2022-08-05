// asaf
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { collection } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  projectCollection!:AngularFirestoreCollection;
  userCollection:AngularFirestoreCollection = this.db.collection('users')

  private url_add_project :string = "http://ec2-54-167-103-46.compute-1.amazonaws.com/addProject";
  private url_get_projects :string = "http://ec2-54-167-103-46.compute-1.amazonaws.com/getProjects";
  private url_delete_projects :string = "http://ec2-54-167-103-46.compute-1.amazonaws.com/deleteProject";
  private url_upload_image :string = "http://ec2-54-167-103-46.compute-1.amazonaws.com/uploadImage";

  public getProject(userId:string){
    const user = {
      "user_id": userId,
    
    };
    console.log(user);
    return this.http.post<any>(`${this.url_get_projects}`, user).pipe(map(result =>{
      console.log("RETURNED PROJECETS RECORDS FROM DynamoDB");

      console.log(result);
      return result;
      }
     )
    )  
  }

  deleteProject(project_id:string){
    const user = {
      "project_id": project_id,
    
    };
    console.log("DELETE PROJECT FROM DynamoDB BY ID:");

    console.log(project_id);
    return this.http.post<any>(`${this.url_delete_projects}`, user).pipe(map(result =>{
      console.log("DELETE SUCCEED");

      return result;
      }
     )
    )  
    }

  addProject(userId:string,name:string, main_category:string,sub_category:string,currency:string,country:string,duration:string,goal:string,result:string, image_url:string){
    const project = {
      "user_id": userId,
      "name":name,
      "main":main_category,
      "sub":sub_category,
      "currency":currency,
      "country":country,
      "duration":duration,
      "goal":goal,
      "result":result,
      "image_url":image_url
    };
    console.log("ADD PROJECT TO DynamoDB TABLE:");

    console.log(project);
    return this.http.post<any>(`${this.url_add_project}`, project).pipe(map(result =>{
      return result;
      }
     )
    )  
   }


   uploadImage(image:any) {
    let fd:FormData = new FormData();
    fd.append('image', image, image.name);
    console.log("IMAGE AS FORM DATA:");
    console.log(fd);
    console.log("SAVE IMAGE IN S3 AND ANALYZE BY REKOGNITION");

    return this.http.post<any>(`${this.url_upload_image}`,fd).pipe(map(res =>{
      const image_data = res

      return image_data[0];
      }
      )
    )
   }

  constructor(private db:AngularFirestore, public http:HttpClient) { }
}
