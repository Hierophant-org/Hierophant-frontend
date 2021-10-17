import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/environments/environment';
import { User } from '../models/user';

const url = `${backendUrl}/posts`;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  token: string = "";
  username: string = "";
  postObj: any;
  obj: any;

  constructor(private http: HttpClient, private userService: UserService) { }

  // POST
  public createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${url}/insert`, post);
  }

  // GET
  public findAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${url}/findAll`, { headers: { skip: "true" } });
  }

  public findPoster(postId: number): Observable<User> {
    return this.http.get<User>(`${url}/findAllUsers?id=${postId}`, { headers: { skip: "true" } })
  }

  // UPDATE
  public updateVotes(post: Post) {
    return this.http.patch(`${url}/update`, post);
  }

  // DELETE
}
