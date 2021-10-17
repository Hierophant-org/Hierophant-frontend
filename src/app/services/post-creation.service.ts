import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PostCreationService {
  token: string = "";
  constructor() { }
  
  getDecodedAccessToken(): any {
    try {
      this.token = localStorage.getItem('Hierophant Token') || '{}';
      return jwt_decode(this.token);
    }
    catch (Error) {
      return "";
    }
  }
}
