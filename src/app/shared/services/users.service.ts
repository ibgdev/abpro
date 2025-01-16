import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = "http://localhost:8080/user/get-users-api.php";
  private deleteUrl = "http://localhost:8080/user/delete-users-api.php";

  constructor(private http: HttpClient) {}
  getUsers(Depid:string | null): Observable<any> {
    console.log(Depid)
    return this.http.get<any>(`${this.apiUrl}?dep_id=${Depid}`);
  }

  deleteUser(id: number) {
    return this.http.get<any>(`${this.deleteUrl}?id=${id}`);
  }
  
}

