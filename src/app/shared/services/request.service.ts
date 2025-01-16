import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = "http://localhost:8080/request/request-add-api.php";
  private apiUrl2 = "http://localhost:8080/request/request-api.php";
  
  constructor(private http: HttpClient) { }

  getRequests(userId: string | null): Observable<any> {
    if (userId) {
      return this.http.get<any>(`${this.apiUrl2}?id=${userId}`);
    } else {
      return this.http.get<any>(this.apiUrl2);
    }
  }

  addRequest(user_id : string, type : string, details : string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 
      user_id, 
      type, 
      details
    };
    return this.http.post(this.apiUrl, body, { headers });
  }
}
