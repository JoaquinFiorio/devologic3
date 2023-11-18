import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:3000/api";
  user = "";

  constructor(private http: HttpClient, private router: Router) { }

  logIn(user : any): Observable<any>{
    return this.http.post(this.url + "/user/signin", user)
  }

  logedIn() {
    return !!localStorage.getItem("sk-adi6kngMNY");
  }

  getToken() {
    return localStorage.getItem("sk-adi6kngMNY");
  }

  logOut() {
    localStorage.removeItem("sk-adi6kngMNY");
    this.user = "";
    this.router.navigate(["/login"]);
  }

  forgot(email : any): Observable<any> {
    return this.http.post<any>(this.url + "/forgot", email)
  }

  resetPassword(id : string, password : any): Observable<any>{
    return this.http.put(this.url + "/forgot/" + id, password)
  }

  createUser(email: string) {
    return this.http.post(this.url + "/user", { email });
  }

  getUsers() {
    return this.http.get<any[]>(this.url + "/user");
  }

  getUser(id: string) {
    return this.http.get<any[]>(this.url + "/user/" + id);
  }

  deleteUser(id: any) {
    return this.http.delete(this.url + "/user/" + id)
  }
}
