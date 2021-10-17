<<<<<<< HEAD
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> fcef37f4daaf3eb311c9afc8c1ac1c8c256c363f
import { Injectable } from '@angular/core';
import {Meme}from 'src/app/models/meme';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Image } from 'src/app/models/image';
import { PostCreationService } from './post-creation.service';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class GeneratorService {
  memes!: Meme[];

<<<<<<< HEAD
  constructor(private http: HttpClient, private postCreation: PostCreationService, private postService: PostService, private UService: UserService , private router: Router) { }
  // 'Content-Type': 'application/json',
  httpOptions = {
    headers: new HttpHeaders({

    })
  }

=======
  constructor(private http: HttpClient) { }

  public getMemes() {
    return this.http.get<any>("https://api.imgflip.com/get_memes").pipe();
  }
>>>>>>> fcef37f4daaf3eb311c9afc8c1ac1c8c256c363f


  uploadImageFile(file:any){ 
    let formData = new FormData();
    formData.append('myImage', file);
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: false,
    };
    let image:any;
    let nameFromToken: any = this.postCreation.getDecodedAccessToken();
    let user: User = new User(0, nameFromToken.sub, '', '', [], []);
    let post: Post = new Post(0, "", user, image, 0, []);
    this.http.post('http://localhost:5000/hierophant/images/upLoad', formData, options).subscribe(
      response=>
      {
        console.log(response);
        console.log("username :" +user.username+" \n title :" + file.name);
        image = response; 
        post.postId = image.imageId;
        post.image = image;
        post.userId = user;
        post.title = file.name;
        console.log(post);
        this.postService.createPost(post);
        this.router.navigate(['/home']);
      }
    )
    
  }
  
  public getImageById(id:number)
  {
    return this.http.get<any>("http://localhost:5000/hierophant/images/find?id="+id).pipe();
  }
  
  

}
