import { Post } from 'src/app/models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { PostCreationService } from 'src/app/services/post-creation.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css']
})
export class PostCreationComponent implements OnInit {
  title = "Create Post";
  selectedImage: String = "";
  templates: string[] = ["https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg", "https://imgflip.com/s/meme/Distracted-Boyfriend.jpg"];
  nameFromToken: any = this.postCreation.getDecodedAccessToken();
  user: User = new User(0, this.nameFromToken.sub, '', '', [], []);
  image: Image = new Image(0, "", "", "")
  post: Post = new Post(0, "", this.user, this.image, 0, [])
  constructor(private postService: PostService, private postCreation: PostCreationService,private toastr: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }
  public createPost(): void {
    this.postService.createPost(this.post)
      .subscribe(
        data => { this.successToastr();
          this.router.navigate(['/home']);}
      )
  }
  setImageHtml(selectedHtml: string) {
    // populate all fields
    this.image.imgHtml = selectedHtml;
  }

  public getUserInfo(): any {
    return this.userService.getUserInfo(this.nameFromToken.sub).subscribe(data => {
      this.user.userId = data.userId;
    })
  }
  
  public successToastr() {
    this.toastr.success(`Post ${this.post.title} created!`, "Creation Successful!");
  }
  public errorToastr() {
    this.toastr.error("Something went wrong, please try again", "CreationFailed");
  }



}
