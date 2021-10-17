import { UserService } from './../../services/user.service';
import { CommentService } from './../../services/comment.service';
import { User } from './../../models/user';
import { Post } from 'src/app/models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  panelOpenState = false;
  public posts: Post[] = [];
  public users: User[] = [];
  private _activeValue = "";
  private numberOfUpvotes: number = 0;
  public clientMessage = new ClientMessage('No Posts to show ):');

  constructor(private postServ: PostService, private comServ: CommentService, public userServ: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.findAllPosts();
  }

  public findAllPosts() {
    const observable = forkJoin({
      p: this.postServ.findAllPosts(),
    }).subscribe(data => {
      this.posts = data.p;
      this.posts.forEach(pos => {
        this.postServ.findPoster(pos.postId).subscribe(
          data => {
            pos.userId = data
          }
        );
        for (let index = 0; index < pos.comments.length; index++) {
          this.comServ.findWhoCommented(pos.comments[index].comId).subscribe(
            data => pos.comments[index].userId = data
          )
        }
      }
      )
    })
  }

  public onChange(event: { value: string; }, group: { value: string }, p: Post) {
    this.userServ.checkTokenValidation().subscribe(data => {
      if (localStorage.getItem('Hierophant Token') && data === "passed checking gate") {
        if (this._activeValue === event.value) {
          this.numberOfUpvotes = (parseInt(event.value) - 1);
          p.upvotes = this.numberOfUpvotes;
          this.postServ.updateVotes(p).subscribe();
          group.value = "";
        } else {
          this._activeValue = event.value;
          this.numberOfUpvotes = (parseInt(event.value) + 1);
          p.upvotes = this.numberOfUpvotes;
          this.postServ.updateVotes(p).subscribe();
          this._activeValue = (parseInt(event.value) + 1).toString();
        }
      }
      else {
        this.errorToastr();
        localStorage.removeItem('Hierophant Token');
      }
    });
  }
  public errorToastr() {
    this.toastr.error("Login to upvote!", "Oops");
  }

}
