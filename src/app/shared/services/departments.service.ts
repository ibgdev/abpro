import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private apiUrl = "http://localhost:8080/departments-api.php"
  private deleteUrl = "http://localhost:8080/delDepartment-Api.php"
  constructor(private http: HttpClient) { }

  getDepartments(){
    return this.http.get<any>(this.apiUrl)
  }

  addDepartment(department_id : string, department_name : string, admin_id : string ){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl,{department_id,department_name,admin_id},{headers})
  }

  deleteDepartment(id: number) {
    return this.http.get<any>(`${this.deleteUrl}?id=${id}`);
  }
}
