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
  title = "Create Post"
  selectedImage: String = "";
  templates: string[] = ["https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg", "https://imgflip.com/s/meme/Distracted-Boyfriend.jpg"]
  user: User = new User(1, 'joel', 'joel', 'joel@gmail.com', [], []);
  image: Image = new Image(0, "", "", "")
  post: Post = new Post(0, "", this.user, this.image, 0, [])
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }
  public createPost(): void {
    this.postService.createPost(this.post)
      .subscribe(
        data => { console.log(`data from backend ${data}`); }
      )
  }
  setImageHtml(selectedHtml: string) {
    // populate all fields
    this.image.imgHtml = selectedHtml;
    console.log(this.image.imgHtml);
  }
}
