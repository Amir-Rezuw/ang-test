import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from './Course.Model';
import { DataStorageService } from './storage.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  constructor(
    private storageService: DataStorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList() {
    this.storageService.fetchCourses().subscribe({
      next: (data) => {
        if (this.router.url === '/courses') {
          this.courses = data;
        } else {
          this.courses = data.filter((course) => course.doesUserRegistered);
        }
      },
    });
  }
}
