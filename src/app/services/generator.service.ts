import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Meme}from 'src/app/models/meme';
@Injectable({
  providedIn: 'root'
})

export class GeneratorService {


  constructor(private http: HttpClient) { }
  // 'Content-Type': 'application/json',
  httpOptions = {
    headers: new HttpHeaders({

    })
  }

   getMemes()
{
  this.http.get<any>(  "https://api.imgflip.com/get_memes" ).subscribe
  (
   response =>
   {
     return  response.data.memes;
   }
  );
}

  uploadImageFile(file:any){ 
    let formData = new FormData();
    formData.append('myImage', file);
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: false,
    };
    this.http.post('http://localhost:5000/hierophant/images/upLoad', formData, options).subscribe(
      response=>
      {
        return response.toString();
      }
    )
    
  }
  
  public getImageById(id:number)
  {
    return this.http.get<any>("http://localhost:5000/hierophant/images/find?id="+id).pipe();
  }
}
