import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  public loginUser(): void {
    // call this.userService.registerUser() method and post it
    this.userService.loginUser(this.user)
      .subscribe( // subscribe to the data returned and do something like generate client message
        data => {
          // if (data.password != "" && data.password == this.user.password) {
          //   console.log(`Correct!!`);
          //   // assign a JWT token
          //   // redirect to either home page.
          //   //==================================
          //   // send correct stuff as json to backend 
          //   // backend will check those values against db
          //   // then send back a token to front end
          // }
          // else {
          //   console.log(`Wrong!! ${data.password} answer:${this.user.password}`);
          //   // pop up
          //   // refresh the page 
          // }
        },
        error => this.clientMessage.message = `Something went wrong. Error: ${error}` // console.error(`We got an error: ${error}` 
      )
    // TODO: if everything is successful, post an alert to be rendered in the view if we add successfully
  }

  ngOnInit(): void {
  }

}
