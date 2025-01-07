import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private apiUrl = "http://localhost:8080/departments-api.php"
  constructor(private http: HttpClient) { }

  getDepartments(){
    return this.http.get<any>(this.apiUrl)
  }
}
