import { Post } from './../../models/post';
import { CommentService } from './../../services/comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() post!:Post
  public comments: Comment[] = [];
  public users: User[] = [];

  constructor(private comServ:CommentService) { }

  ngOnInit(): void {

  }
  public findAllComment() {
    const observable = forkJoin({
      p: this.comServ.findAllComments(),
      u: this.comServ.findAllCommentUsers(this.post.postId)
    }).subscribe(data => {
      this.comments = data.p;
      this.users = data.u;
      for (let index = 0; index < this.comments.length; index++) {
        this.comments[index].userId = this.users[index];
        console.log(this.comments[index]);
      }

    })
  }
}
