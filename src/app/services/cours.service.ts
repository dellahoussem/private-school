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

  getCoursById(id: string) {
  return this.httpClient.get<any>(`${this.coursURL}/getCoursById/${id}`);
}

  // Affecter un student à un cours
  affectStudent(coursId: string, studentId: string) {
    return this.httpClient.put(`${this.coursURL}/affect-student/${coursId}`, { studentId });
  }

removeStudent(coursId: string, studentId: string) {
  return this.httpClient.put(
    `${this.coursURL}/remove-student/${coursId}`,
    { studentId }
  );
}





}