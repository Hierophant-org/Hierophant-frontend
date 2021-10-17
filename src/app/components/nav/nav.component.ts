import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostCreationService } from 'src/app/services/post-creation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

  constructor(public userServ: UserService, public postCreation: PostCreationService, private toastr: ToastrService) { }

  public logOut(): void {
    localStorage.removeItem('Hierophant Token');
  }
  public successToastr() {
    this.toastr.success("Sorry to see you go :C", "Log out Successful!");
  }

  public callingMultiple() {
    this.logOut();
    this.successToastr();
  }
}


