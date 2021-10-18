import { backendUrl } from './../../environments/environment';
import { User } from './../models/user';
import { Token } from './../models/token';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { PostCreationService } from './post-creation.service';

const url = `${backendUrl}/users`;

@Injectable({
  providedIn: 'root'
})

export class UserService { // this service is only responsible for one thing: making HTTP requests to a server

  private readonly TOKEN_NAME = 'Hierophant Token';
  private token: Token = new Token("", "");

  constructor(private http: HttpClient, private router: Router, private postCreation: PostCreationService) { }

  // POST
  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${url}/register`, user, { headers: { skip: "true" } })
  }

  public loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${url}/authenticate`, user, { responseType: 'text' as 'json', headers: { skip: "true" } })
      .pipe(
        tap((response: any) => {
          if (response == "No token") {
            null
          }
          else {
            localStorage.setItem(this.TOKEN_NAME, response);
          }
        }),
      )
  }

  // GET
  public getToken() {
    return (`Bearer ${localStorage.getItem(this.TOKEN_NAME)}`);
  }

  public getUserInfo(username: string): Observable<User> {
    return this.http.get<User>(`${url}/findBy?username=${username}`);
  }

  public checkTokenValidation() {
    this.token.username = this.postCreation.getDecodedAccessToken().sub;
    this.token.token = this.getToken();
    return this.http.post(`${url}/check`, this.token, { responseType: 'text' as 'json' });
  }

  // DELETE
}
