import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  private markApiUrl = 'http://localhost:8080/absences/mark-absence.php';
  private getAbsencesApiUrl = 'http://localhost:8080/absences/getAbsences.php';
  private sendEmailApiUrl = 'http://localhost:8080/absences/sendEmail.php'; 

  constructor(private http: HttpClient) {}

  getAbsences(depid: string | null): Observable<any> {
    return this.http.get<any>(`${this.getAbsencesApiUrl}?Depid=${depid}`);
  }

  markAbsent(userId: string | null) {
    return this.http.get<any>(`${this.markApiUrl}?id=${userId}`);
  }

  sendEmail(email: string, fullname: string): Observable<any> {
    return this.http.post<any>(this.sendEmailApiUrl, { email, fullname });
  }
}
