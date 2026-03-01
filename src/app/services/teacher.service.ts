import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

coursURL: string = "http://localhost:3000/teacher";
  
constructor(private httpClient: HttpClient) { }

getMyCourses(teacherId: string) {
  return this.httpClient.get(`${this.coursURL}/my-courses/${teacherId}`);
}


addCourse(course: any, teacherId: string) {
  return this.httpClient.post(
    `${this.coursURL}/addCours/${teacherId}`,
    course
  );
}


getCourseById(id: string) {
  return this.httpClient.get(
    `${this.coursURL}/getCourseById/${id}`
  );
}

gradeStudent(data: any) {
  return this.httpClient.post(
    `${this.coursURL}/grade`, data
  );
}

}
