import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { Course } from './Course.Model';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  _API_URL = 'https://ang-task-default-rtdb.firebaseio.com/';
  constructor(
    private http: HttpClient,
    private courseService: CourseService,
    private cookieService: CookieService
  ) {}

  storeCourse() {
    const courses = this.courseService.getCourses();
    return this.http.put(`${this._API_URL}courses.json`, courses, {
      params: { auth: this.cookieService.get('idToken') },
    });
  }

  fetchCourses() {
    return this.http
      .get<Course[]>(`${this._API_URL}courses.json`, {
        params: { auth: this.cookieService.get('idToken') },
      })
      .pipe(
        tap((courses) => {
          this.courseService.setAllCourses(courses);
        })
      );
  }
}
