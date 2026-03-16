import { Component , Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cours-teacher',
  imports: [CommonModule, RouterModule],
  templateUrl: './cours-teacher.component.html',
  styleUrl: './cours-teacher.component.css'
})
export class CoursTeacherComponent {
 @Input() courses: any[] = [];
  @Output() deleteCourseEvent = new EventEmitter<string>();

  deleteCourse(id: string) {
    this.deleteCourseEvent.emit(id);
  }
}
