import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {  
  private apiUrl = "http://localhost:8080/change-password-api.php";
  constructor(private http: HttpClient) {}

  changePassword(userId: string, newPassword: string): Observable<any> {
    const requestData = {
      password: newPassword
    };

    return this.http.post<any>(`${this.apiUrl}?id=${userId}`, requestData);
  }
}
