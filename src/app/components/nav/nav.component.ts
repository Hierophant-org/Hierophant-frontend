import { Component, OnInit } from '@angular/core';
import { PostCreationService } from 'src/app/services/post-creation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public userServ: UserService, public postCreation: PostCreationService) { }
  ngOnInit(): void {
  }
  public logOut(): void {
    localStorage.removeItem('Hierophant Token');
  }
}
