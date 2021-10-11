import { localUrl, awsUrl } from './../../environments/environment';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
// we must import HttpClientModule in the app.module.ts
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


const url = `${awsUrl}/users`;

// we will inject this service into the components that call its methods
// within their methods
@Injectable({ // Services in Angular are singlton object 
  providedIn: 'root'
})
export class UserService { // this service is only responsible for one thing: making HTTP requests to a server

  // we need to inject this service with HttpClient
  constructor(private http: HttpClient) { }

  // we need to append Headers to all requests
  /**
   * ,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  // POST
  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${url}/register`, user, this.httpOptions) // url, user, this.httpOptions
      .pipe( // we are calling a method on the data returned in the observable
        catchError(this.handleError) // passing a callback
      )
  }

  public loginUser(user: User): Observable<User> {
    //http://localhost:5000/hierophant/users/findBy?username=
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization' }).set("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJVc2VyIFRva2VuIFBvcnRhbCIsInN1YiI6InRoaW5oIiwiaXNzIjoiQ3JlYXRlZCBieSBoaWVyb3BoYW50IiwiZXhwIjoxNjM0MDE1OTczLCJpYXQiOjE2MzM5ODcxNzN9.BbPyHNHRQVRepskfADugJlZU3cTY83rfZAsH4dbP7TBiEGTRL9vTqXQHzMx2A9WY2lUXCO0PGyYDB1w-KKWtcw");
    return this.http.post<User>(`${url}/authenticate`, user, this.httpOptions) // url, user, this.httpOptions
      .pipe( // we are calling a method on the data returned in the observable
        catchError(this.handleError) // passing a callback
      )
  }

  // GET
  // this method cannot use Observable<User> for some reason
  public welcomeUser(token: string) {
    let tokenStr = `Bearer ${token}`;
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(`${url}/home`);
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
