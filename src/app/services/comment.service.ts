import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { backendUrl } from 'src/environments/environment';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Comment } from '../models/comment';

const url = `${backendUrl}/comments`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  token: string = "";
  username: string = "";
  postObj: any;
  obj: any;
  constructor(private http: HttpClient, private userService: UserService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  findWhoCommented(comId: number) {
    return this.http.get<User>(`${url}/findUser?id=${comId}`, { headers: { skip: "true" } }) // by default a fetch request is asynchronous
      .pipe(
        catchError(this.handleError) // in our component, we subscribe to the observable that htis returns
      )
  }
  public createComment(comment: Comment): Observable<Comment> {
    console.log(comment);
    return this.http.post<Comment>(`${url}/insert`, comment) // url, user, this.httpOptions
      .pipe( // we are calling a method on the data returned in the observable
        catchError(this.handleError) // passing a callback
      )
  }
  // GET
  public findAllComments(postId: number): Observable<Comment[]> {  // An Observable  is a stream of values that wil be returned at over
    // send a get request and return a collection of User objects

    return this.http.get<Comment[]>(`${url}/findByPostId?id=${postId}`, { headers: { skip: "true" } }) // by default a fetch request is asynchronous
      .pipe(
        catchError(this.handleError) // in our component, we subscribe to the observable that htis returns
      )
  }
  public findAllCommentUsers(postId: number): Observable<User[]> {  // An Observable  is a stream of values that wil be returned at over
    // send a get request and return a collection of User objects

    return this.http.get<User[]>(`${url}/findAllUsers?id=${postId}`, { headers: { skip: "true" } }) // by default a fetch request is asynchronous
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
