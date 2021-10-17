import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GeneratorService {

  constructor(private http: HttpClient) { }

  public getMemes() {
    return this.http.get<any>("https://api.imgflip.com/get_memes").pipe();
  }

  public updateImage(fd: FormData) {
    return this.http.post<any>("http://localhost:5000/hierophant/images/uploadImage", fd).pipe();
  }

}
