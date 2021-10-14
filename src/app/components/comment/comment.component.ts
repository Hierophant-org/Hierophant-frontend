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
  @Input() parentPost!:number
  public comments: Comment[] = [];
  public users: User[] = [];

  constructor(private comServ:CommentService) { }

  ngOnInit(): void {
    this.findAllComment();
  }
    // public findWhoCommented(comment:Comment) {
  //   this.comServ.findWhoCommented(this.parentPost,comment.comId).subscribe(data => {
  //     this.users = data;
  //   })
  // }
  public findAllComment() {
    const observable = forkJoin({
      p: this.comServ.findAllComments(this.parentPost),
    }).subscribe(data => {
      this.comments.concat(data.p);
      console.log(data);
      // for (let index = 0; index < this.comments.length; index++) {
      //   this.comments[index].userId = this.users[index];
      //   console.log(this.comments[index]);
      // }

    })
  }
}
