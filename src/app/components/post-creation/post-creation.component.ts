import { Post } from 'src/app/models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css']
})
export class PostCreationComponent implements OnInit {
  title= "Create Post"
  user:User = new User(0,'','','',[],[]);
  image:Image = new Image(0,"","","")
  post:Post = new Post(0,"",this.user,this.image,0,[])
  constructor(private postService:PostService) { }

  ngOnInit(): void {
  }
  createPost(){

    this.postService.createPost(this.post);
  }
}
