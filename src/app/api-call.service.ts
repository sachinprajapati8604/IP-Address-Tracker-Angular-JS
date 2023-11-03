import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  private geoapiurl = `https://geo.ipify.org/api/v2/country,city?apiKey=${environment.geoapiKey}&ipAddress=`;

  constructor(private http: HttpClient) { }

  getData(arg: string) {
    return this.http.get(`${this.geoapiurl}${arg}`);
  }
}
