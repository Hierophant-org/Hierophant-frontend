import { User } from './../../models/user';
import { Post } from 'src/app/models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { Observable, scheduled, Scheduler } from 'rxjs';
import { concat } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  title = "All Posts"
  public posts: Post[] = [];
  public users: User[] = [];

  public clientMessage = new ClientMessage('No Posts to show ):');
  constructor(private postServ: PostService) {}
  ngOnInit(): void {
    this.setUsers();
    this.findAllPosts();
  }
  
  public findAllPosts() {
    concat(this.postServ.findAllPosts() // every object that is captured from the observabel is set as our users array
      , // this defines what we do with the data returned from the observable
    this.postServ.findAllPostUsers() // every object that is captured from the observabel is set as our users array
       // this defines what we do with the data returned from the observable
    ).subscribe(data => console.log(data));
    
  }
  public setUsers() {
   for (let index = 0; index < this.posts.length; index++) {
      this.posts[index].userId = this.users[index];
      console.log(this.posts[index]);
    }
  }
}
