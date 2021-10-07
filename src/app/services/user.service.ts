import { localUrl } from './../../environments/environment';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
// we must import HttpClientModule in the app.module.ts
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


const url = `${localUrl}/users`;

// we will inject this service into the components that call its methods
// within their methods
@Injectable({ // Services in Angular are singlton object 
  providedIn: 'root'
})
export class UserService { // this service is only responsible for one thing: making HTTP requests to a server

  // we need to inject this service with HttpClient
  constructor(private http: HttpClient) { }

  // we need to append Headers to all requests
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  // POST
  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${url}/register`, user, this.httpOptions) // url, user, this.httpOptions
      .pipe( // we are calling a method on the data returned in the observable
        catchError(this.handleError) // passing a callback
      )
  }

  // GET
  public loginUser(user: User): Observable<User> {
    //http://localhost:5000/hierophant/users/findBy?username=
    return this.http.get<User>(`${url}/findBy?username=${user.username}`, this.httpOptions) // url, user, this.httpOptions
      .pipe( // we are calling a method on the data returned in the observable
        catchError(this.handleError) // passing a callback
      )
  }
  // DELETE

  // create a method called handleError which will be invoked if something goes wrong in our http requests
  private handleError(httpError: HttpErrorResponse) {

    if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occured, handle it accordingly
      console.log('And error occured: ', httpError.error.message)
    } else {
      // the backend returned an unsuccessful response code
      // the reponse body might have clues for what went wrong
      console.error(`
        Backend returned code ${httpError.status}, 
        body was: ${httpError.error}
      `)
    }
    // throwError is an Observable from rxJS
    return throwError('Something bad happened; please try again later')

  }

}
