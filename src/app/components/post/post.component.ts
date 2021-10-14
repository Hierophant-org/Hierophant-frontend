import { Comment } from 'src/app/models/comment';
import { User } from './../../models/user';
import { Post } from 'src/app/models/post';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { forkJoin, Observable, scheduled, Scheduler, zip } from 'rxjs';
import { concat } from 'rxjs';
import { concatAll, map, withLatestFrom } from 'rxjs/operators';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  title = "All Posts"
  public posts: Post[] = [];
  public users: User[] = [];
  private _activeValue = "";
  private numberOfUpvotes: number = 0;
  private id: number = 0;

  public clientMessage = new ClientMessage('No Posts to show ):');
  constructor(private postServ: PostService) { }
  ngOnInit(): void {
    this.findAllPosts();
  }

  public findAllPosts() {
    const observable = forkJoin({
      p: this.postServ.findAllPosts(),
      u: this.postServ.findAllPostUsers()
    }).subscribe(data => {

      // this.posts[i].userId = data.u[i];
      // this.posts = data.p;
      this.posts = data.p;
      this.users = data.u;
      for (let index = 0; index < this.posts.length; index++) {
        this.posts[index].userId = this.users[index];
        this.numberOfUpvotes = data.p[index].upvotes;

      }


    })
  }
  // public setUsers() {
  //   for (let index = 0; index < this.posts.length; index++) {
  //     this.posts[index].userId = this.users[index];
  //     console.log(this.posts[index]);
  //   }
  // }
  //


  public onChange(event: { value: string; }, group: { value: string }, p: Post) {
    if (this._activeValue === event.value) {
      // make unchecked
      this.numberOfUpvotes = (parseInt(event.value) - 1);
      // update the database here
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
}
