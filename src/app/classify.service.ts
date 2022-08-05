// asaf
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassifyService {

  private url="https://6tnndxr9nj.execute-api.us-east-1.amazonaws.com/beta"
  

  classify(main_category:string,sub_category:string,currency:string,country:string,duration:string,goal:string){
    let json= {
      "main_category": main_category,
      "sub_category": sub_category,
      "currency": currency,
      "country": country,
      "duration": duration,
      "goal": goal
      }
    let body = JSON.stringify(json);

    console.log(body);
    return this.http.post<any>(this.url , body).pipe(
      map(res =>{
        console.log(res);
        let final:string = res.body;
        final = final.replace('"','')
        final = final.replace('"','')
        return final;
      })
    )
  }
 

  constructor(private http:HttpClient) { }
}
