  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class MandemandeService {

    constructor(private http : HttpClient) { }
    private apiUrl2 = "http://localhost:8080/request/Dep-request-api.php"

    getRequests(depId: string | null): Observable<any> {
      if (depId) {
        return this.http.get<any>(`${this.apiUrl2}?id=${depId}`);
      } else {
        return this.http.get<any>(this.apiUrl2);
      }
    }

    updateRequestStatus(id : string, stat : string, admin_id : string | null){
      return this.http.post(`${this.apiUrl2}`,{id,stat,admin_id})
    }
  }
