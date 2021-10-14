
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = "Register User";
  value: number = 0;
  public user = new User(0, '', '', '', [], []);
  public clientMessage = new ClientMessage('');
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  // showStandard() {
  //   this.toastService.show(this.clientMessage.message, {
  //     delay: 2000,
  //     autohide: true
  //   });
  // }
  // showSuccess() {
  //   this.toastService.show(this.clientMessage.message, {
  //     classname: 'bg-success text-light',
  //     delay: 2000 ,
  //     autohide: true,
  //     headertext: 'Toast Header'
  //   });
  // }
  // showError() {
  //   this.toastService.show(this.clientMessage.message, {
  //     classname: 'bg-danger text-light',
  //     delay: 2000 ,
  //     autohide: true,
  //     headertext: 'Error!!!'
  //   });
  //   }
  public registerUser(): void {
    // call this.userService.registerUser() method and post it
    if (this.user.username === "" && this.user.password === "" && this.user.email === "") {
      this.value = 401;
      this.errorToastr(this.value);
    }
    else if (this.user.username === "") {
      this.value = 402;
      this.errorToastr(402);
    }
    else if (this.user.password.length < 4) {
      this.value = 403;
      this.errorToastr(403);
    }

    else if (!this.user.email.match("^[^@\s]+@[^@\s]+\.[^@\s]+$")) {
      this.value = 404;
      this.errorToastr(404);
    }
    else {
      this.userService.registerUser(this.user)
        .subscribe( // subscribe to the data returned and do something like generate client message
          (data => {
            this.successToastr();
            this.router.navigate(['/login']);
          }),
          (error => {
            this.errorToastr(405);
          })
        )
    }
  }

  public successToastr() {
    this.toastr.success(`${this.user.username} please login!`, "Register Successful!");
  }
  public errorToastr(value: number) {
    switch (value) {
      case 401:
        this.toastr.error("Inputs cannot be empty", "Register Failed!");
        break;
      case 402:
        this.toastr.error("Username cannot be empty", "Register Failed!");
        break;
      case 403:
        this.toastr.error("Password cannot be less than 4", "Register Failed!");
        break;
      case 404:
        this.toastr.error("Invalid email input", "Register Failed!");
        break;
      case 405:
        this.toastr.error("Something went wrong", "Register Failed!");
        break;
    }
  }

  ngOnInit(): void {
  }

}
