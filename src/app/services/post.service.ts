import { Post } from 'src/app/models/post';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { localUrl, awsUrl } from 'src/environments/environment';
import { User } from '../models/user';

const url = `${awsUrl}/posts`;
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // POST
  public createPost(post: Post): Observable<Post> {
    console.log(post);
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJVc2VyIFRva2VuIFBvcnRhbCIsInN1YiI6InRoaW5oIiwiaXNzIjoiQ3JlYXRlZCBieSBoaWVyb3BoYW50IiwiZXhwIjoxNjM0MTI2MTA0LCJpYXQiOjE2MzQwOTczMDR9.4l6AyQ0hyGHZH2NkLiTNtCTX3rfILsE5Z_JyhTcWs9jGyzDYMFko0X7xZhzFtzWzr-bBl41e2MBt9fFfxTQueQ');
    return this.http.post<Post>(`${url}/insert`, post, { headers }) // url, user, this.httpOptions
      .pipe( // we are calling a method on the data returned in the observable
        catchError(this.handleError) // passing a callback
      )
  }
  // GET
  public findAllPosts(): Observable<Post[]> {  // An Observable  is a stream of values that wil be returned at over
    // send a get request and return a collection of User objects

    return this.http.get<Post[]>(`${url}/findAll`) // by default a fetch request is asynchronous
      .pipe(
        catchError(this.handleError) // in our component, we subscribe to the observable that htis returns
      )
  }
  public findAllPostUsers(): Observable<User[]> {  // An Observable  is a stream of values that wil be returned at over
    // send a get request and return a collection of User objects

    return this.http.get<User[]>(`${url}/findAllUsers`) // by default a fetch request is asynchronous
      .pipe(
        catchError(this.handleError) // in our component, we subscribe to the observable that htis returns
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
