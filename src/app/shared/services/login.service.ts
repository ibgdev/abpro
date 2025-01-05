
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = "http://localhost:8080/login-api.php"
  constructor(private http: HttpClient) { }

  login(email : string, password : string): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {email , password}
    return this.http.post(this.apiUrl, body, {headers})
  }
}
