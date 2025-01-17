import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private arrivalUrl = 'http://localhost:8080/presence/arrival.php';
  private departureUrl = 'http://localhost:8080/presence/departure.php';
  private hasArrivedUrl = 'http://localhost:8080/presence/hasArrived.php'
  private hasdepartUrl = 'http://localhost:8080/presence/hasDepart.php'
  constructor(private http: HttpClient) {}

  markArrival(user_id: string | null): Observable<any> {
    return this.http.post(this.arrivalUrl, { user_id });
  }
  
  hasArrived(user_id: string | null): Observable<boolean> {
    return this.http.post<any>(this.hasArrivedUrl, { user_id });
  }
  markDeparture(user_id: string | null): Observable<any> {
    return this.http.post(this.departureUrl, { user_id });
  }
  hasDepart(user_id: string | null): Observable<boolean> {
    return this.http.post<any>(this.hasArrivedUrl, { user_id });
  }

}
