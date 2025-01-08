import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = "http://localhost:8080/register-api.php";
  
  constructor(private http: HttpClient) { }

  register(fullname: string, email: string, password: string, department: string, role: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 
      full_name: fullname, 
      email, 
      password, 
      selectedDepartment: department, 
      role 
    };
    return this.http.post(this.apiUrl, body, { headers });
  }
}
