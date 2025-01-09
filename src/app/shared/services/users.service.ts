import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = "http://localhost:8080/get-users-api.php";
  private deleteUrl = "http://localhost:8080/delete-users-api.php";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteUser(id: number) {
    return this.http.get<any>(`${this.deleteUrl}?id=${id}`);
  }
}

