import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private toastr: ToastrService, private router: Router, private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // If the user doesn't have a token then they can't access a certain route
    this.userService.checkTokenValidation().subscribe(data => {
      if (localStorage.getItem('Hierophant Token') && data === "passed checking gate") {
        return true;
      }
      else {
        this.errorToastr();
        this.router.navigate(['/login']);
        localStorage.removeItem('Hierophant Token');
        return false;
      }
    });
    return true;
  }

  public errorToastr() {
    this.toastr.error("Login Required", "Access Denied");
  }
}
