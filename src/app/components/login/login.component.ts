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
  public user = new User(0,'','','',[],[]);
  public clientMessage = new ClientMessage('');
  
  constructor(private userService: UserService) { }

  public loginUser(): void {
    // call this.userService.registerUser() method and post it
    let opass="";
    this.userService.loginUser(this.user)
      .subscribe( // subscribe to the data returned and do something like generate client message
        data => {opass=data.password,console.log(opass==this.user.password)},//, //this.clientMessage.message = `Successfully login: ${data.username}`,
         // 
        error => this.clientMessage.message = `Something went wrong. Error: ${error}` // console.error(`We got an error: ${error}` 
      )
      if(opass!="" && opass==this.user.password){
        console.log(`Correct!!`);
      }
      else{
        console.log(`Wrong!! ${opass} answer:${this.user.password}`);
      }
      // TODO: if everything is successful, post an alert to be rendered in the view if we add successfully
  }

  ngOnInit(): void {
  }

}
