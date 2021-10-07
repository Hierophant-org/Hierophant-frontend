import { Post } from 'src/app/models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  title = "All Posts"
  public posts: Post[] = [];

  public clientMessage = new ClientMessage('No Posts to show ):');
  
  constructor(private postServ:PostService) { }

  ngOnInit(): void {
    this.findAllPosts();
  }
  public findAllPosts() {

    this.postServ.findAllPosts() // every object that is captured from the observabel is set as our users array
      .subscribe(data => this.posts = data) // this defines what we do with the data returned from the observable
    
  }
}
