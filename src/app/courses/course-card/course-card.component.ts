import { Component, Input } from '@angular/core';
import { Course } from '../Course.Model';
import { CourseService } from '../course.service';
import { DataStorageService } from '../storage.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() courseIndex!: number;
  constructor(
    private courseService: CourseService,
    private storageService: DataStorageService
  ) {}

  onSelectCourse() {
    const newCourse = new Course(
      this.course.courseName,
      this.course.courseImagePath,
      this.course.instructorImagePath,
      this.course.instructorName,
      this.course.courseDuration,
      this.course.coursePrice,
      this.course.courseRating,
      this.course.courseId,
      true
    );
    this.courseService.updateCourse(this.courseIndex, newCourse);

    this.storageService.storeCourse().subscribe(() => {
      this.course.doesUserRegistered = true;
    });
  }
  returnStarStyle(current: number) {
    if (this.course.courseRating < current) {
      return '../../../assets/star.svg';
    } else {
      return '../../../assets/filled-star.svg';
    }
  }
}
