import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

   URL = "http://localhost:3000/student";

  constructor(private http: HttpClient) {}

getMyCourses(studentId: string) {
    return this.http.get(`${this.URL}/my-courses/${studentId}`);
  }

  getCourseDetails(studentId: string, coursId: string) {
    return this.http.get(`${this.URL}/course-details/${studentId}/${coursId}`);
  }

}
