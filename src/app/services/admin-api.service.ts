import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  SERVER_URL = "http://localhost:3000"
  constructor(private http:HttpClient) { }

  authenticate(){
    // how to make api call using Angular Frame Work
    // http://localhost:3000/users/1
    return this.http.get(`${this.SERVER_URL}/users/1`)

  }

}
