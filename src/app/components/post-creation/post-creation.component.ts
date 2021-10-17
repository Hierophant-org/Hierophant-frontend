import { Post } from 'src/app/models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { PostCreationService } from 'src/app/services/post-creation.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GeneratorService } from 'src/app/services/generator.service';
import { Meme } from 'src/app/models/meme';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css']
})

export class PostCreationComponent implements OnInit {
  title = "Create Post";
  memes: Meme[] = [];
  selectedImage: String = "";
  nameFromToken: any = this.postCreation.getDecodedAccessToken();
  user: User = new User(0, this.nameFromToken.sub, '', '', [], []);
  image: Image = new Image(0, "", "", "","")
  post: Post = new Post(0, "", this.user, this.image, 0, [])

  constructor(private postService: PostService, private postCreation: PostCreationService, private toastr: ToastrService, private userService: UserService, private router: Router, private generatorService: GeneratorService) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getMemes();
  }

  public getMemes() {
    this.generatorService.getMemes().subscribe(
      response => {
        this.memes = response.data.memes;
      }
    )
  }

  public createPost(): void {
    this.userService.checkTokenValidation().subscribe(data => {
      if (localStorage.getItem('Hierophant Token') && data === "passed checking gate") {
        this.postService.createPost(this.post)
          .subscribe(
            data => {
              this.successToastr();
              this.router.navigate(['/home']);
            }
          )
      }
      else {
        this.errorToastr();
        this.router.navigate(['/login']);
        localStorage.removeItem('Hierophant Token');
      }
    });
  }
<<<<<<< HEAD
  setImageHtml(selectedHtml: string) {
    // populate all fields
    this.image.pic = selectedHtml;
=======

  public setImageHtml(selectedHtml: string) {
    this.image.imgHtml = selectedHtml;
>>>>>>> fcef37f4daaf3eb311c9afc8c1ac1c8c256c363f
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
    this.toastr.error("Cannot create post with modified token", "CreationFailed");
  }
}
