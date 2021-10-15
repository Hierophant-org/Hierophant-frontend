import { PostCreationComponent } from './components/post-creation/post-creation.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/post/post.component';
import { GeneratorComponent } from './components/generator/generator.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create', component: PostCreationComponent},
<<<<<<< HEAD
  {path: 'generator', component: GeneratorComponent},
=======
  {path: 'g', component: GeneratorComponent},
>>>>>>> main
  {path: '**', component: MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) { }
}
