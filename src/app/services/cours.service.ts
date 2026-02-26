import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

 coursURL: string = "http://localhost:3000/cours";
  
constructor(private httpClient: HttpClient) { }

addCours(cours: any) {
    return this.httpClient.post<{ msg: string }>(this.coursURL+"/add", cours);
  }

deleteCours(id: string) {
  return this.httpClient.delete(`${this.coursURL}/${id}`);
}

getAllCours() {
    return this.httpClient.get<any[]>(this.coursURL+"/getAlleCours");
  }
}