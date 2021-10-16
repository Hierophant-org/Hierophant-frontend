import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  public getMemes() {
    console.log("calling api endpoint")
    return this.http.get<any>("https://api.imgflip.com/get_memes").pipe();
  }

  public updateImage(fd: FormData) {
    return this.http.post<any>("http://localhost:5000/hierophant/images/uploadImage", fd).pipe();
  }

}
