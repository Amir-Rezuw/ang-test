import { Injectable } from '@angular/core';
import { Course } from './Course.Model';

@Injectable()
export class CourseService {
  private courses: Course[] = [];

  updateCourse(index: number, newCourse: Course) {
    this.courses[index] = newCourse;
  }

  setAllCourses(courses: Course[]) {
    this.courses = courses;
  }

  getCourses() {
    return [...this.courses];
  }
}
