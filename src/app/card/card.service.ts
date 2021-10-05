import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  add(card: string): Observable<boolean> {
    return this.http.post<any>(
      `${environment.baseURL}/add`,
      {card}
    );
  }

  getAll(): Observable<string[]> {
    return this.http.get<any>(
      `${environment.baseURL}/cards`
    );
  }

}
