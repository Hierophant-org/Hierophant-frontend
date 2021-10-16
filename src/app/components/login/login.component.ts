
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = "Login";
  public user = new User(0, '', '', '', [], []);
  public clientMessage = new ClientMessage('');
  private readonly TOKEN_NAME = 'Hierophant Token';

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  public loginUser(): void {
    // call this.userService.registerUser() method and post it
    this.userService.loginUser(this.user)
      .subscribe( // subscribe to the data returned and do something like generate client message
        (data => {
          this.successToastr();
          this.router.navigate(['/home']);
        }),
        (error => {
          this.errorToastr();
        }) // console.error(`We got an error: ${error}` 
      )
    // TODO: if everything is successful, post an alert to be rendered in the view if we add successfully
  }

  public successToastr() {
    this.toastr.success(`Generating a token for ${this.user.username.toUpperCase()}!`, "Login Successful!");
  }
  public errorToastr() {
    this.toastr.error("Try again later", "Login Failed");
  }
  ngOnInit(): void {
  }

}
