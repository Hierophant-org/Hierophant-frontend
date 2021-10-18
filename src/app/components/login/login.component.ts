import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  title = "Login";
  public user = new User(0, '', '', '', [], []);
  public clientMessage = new ClientMessage('');

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  public loginUser(): void {
    this.userService.loginUser(this.user)
      .subscribe(
        (data => {
          if (localStorage.getItem('Hierophant Token') === null) {
            this.errorToastr();
            localStorage.removeItem('Hierophant Token');
          }
          else {
            this.successToastr();
            this.router.navigate(['/']);
          }
        }),
        (error => {
          this.errorToastr();
        })
      )
  }

  public successToastr() {
    this.toastr.success(`Generating a token for ${this.user.username.toUpperCase()}!`, "Login Successful!");
  }

  public errorToastr() {
    this.toastr.error("Try again later", "Login Failed");
  }
}
