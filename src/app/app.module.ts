import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { PostComponent } from './components/post/post.component';
import { MainComponent } from './components/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostCreationComponent } from './components/post-creation/post-creation.component';
<<<<<<< HEAD
import { FreeDraggingDirective } from './free-dragging.directive';
import { GeneratorComponent } from './components/generator/generator.component';
=======
import { GeneratorComponent } from './components/generator/generator.component';
import { FreeDraggingDirective } from './free-dragging.directive';
import { AuthInterceptorProvider } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommentComponent } from './components/comment/comment.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

>>>>>>> main

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    PostComponent,
    MainComponent,
    ToastComponent,
    PostCreationComponent,
<<<<<<< HEAD
    FreeDraggingDirective,
    GeneratorComponent,
=======
    GeneratorComponent,
    FreeDraggingDirective,
    CommentComponent
>>>>>>> main
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true
    }),
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
<<<<<<< HEAD
  exports: [FreeDraggingDirective],
  providers: [],
  bootstrap: [AppComponent]
=======
  // 
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
  schemas: []
>>>>>>> main
})
export class AppModule { }
