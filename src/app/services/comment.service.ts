import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  public findWhoCommented(comId: number) {
    return this.http.get<User>(`${url}/findUser?id=${comId}`, { headers: { skip: "true" } });
  }

  public createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${url}/insert`, comment);
  }

  // GET
  public findAllComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${url}/findByPostId?id=${postId}`, { headers: { skip: "true" } });
  }

  public findAllCommentUsers(postId: number): Observable<User[]> {
    return this.http.get<User[]>(`${url}/findAllUsers?id=${postId}`, { headers: { skip: "true" } })
  }

  // DELETE
}
