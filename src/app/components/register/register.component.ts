import { ToastComponent } from './../toast/toast.component';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { User} from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = "Register User"
  public user = new User(0,'','','',[],[]);
  public clientMessage = new ClientMessage('');
  public toast = new ToastComponent(new ToastService);
  constructor(private userService: UserService,public toastService: ToastService) { }

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
    this.userService.registerUser(this.user)
      .subscribe( // subscribe to the data returned and do something like generate client message
        data => this.clientMessage.message = `Successfully inserted ${data.username}`,   // console.log(`successfully added ${data.firstName}`)
        error => this.clientMessage.message = `Something went wrong. Error: ${error}` // console.error(`We got an error: ${error}` 
      )
      // TODO: if everything is successful, post an alert to be rendered in the view if we add successfully
  }
  public testUserObj():void{
    console.log(this.user);

  }
  ngOnInit(): void {
  }

}
