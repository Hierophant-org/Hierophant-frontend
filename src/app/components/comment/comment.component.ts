import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { PostCreationService } from 'src/app/services/post-creation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {

  @Input() parentPost !: Post;

  nameFromToken: any = this.postCreation.getDecodedAccessToken();
  user: User = new User(0, this.nameFromToken.sub, '', '', [], []);
  public comment = new Comment(0, this.user, this.parentPost, '', 0);

  constructor(private postCreation: PostCreationService, private userService: UserService, private commentService: CommentService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getUserId()
  }

  public getUserId(): any {
    return this.userService.getUserInfo(this.nameFromToken.sub).subscribe(data => {
      this.user.userId = data.userId;
    })
  }

  public insertComment() {


    this.userService.checkTokenValidation().subscribe(data => {
      if (localStorage.getItem('Hierophant Token') && data === "passed checking gate") {
        this.comment.postId = this.parentPost;
        this.commentService.createComment(this.comment)
          .subscribe(
            (data => {
              this.successToastr(),
                this.router.navigate(['/home'])
            }),
            (error => {
              this.errorToastr();
            })
          )
      }
      else {
        this.errorToastr();
        localStorage.removeItem('Hierophant Token');
      }
    });





    // this.comment.postId = this.parentPost;
    // this.commentService.createComment(this.comment)
    //   .subscribe(
    //     (data => {
    //       this.successToastr(),
    //         this.router.navigate(['/home'])
    //     }),
    //     (error => {
    //       this.errorToastr();
    //     })
    //   )
  }
  public successToastr() {
    this.toastr.success(`Comment posted`, "Comment Successful!");
  }
  public errorToastr() {
    this.toastr.error("Something went wrong, try again later", "Comment unsuccessful");
  }
}
