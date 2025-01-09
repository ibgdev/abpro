import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private apiUrl = "http://localhost:8080/export-users-api.php"
  constructor(private http:HttpClient) { }

  exportToExcel(){
    return this.http.get(this.apiUrl, {
      responseType: 'blob' // treate as a file
    });
  }
}
