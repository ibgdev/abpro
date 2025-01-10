import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addDepartment(department_name : string, admin_id : string ){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl,{department_name,admin_id},{headers})
  }
}
