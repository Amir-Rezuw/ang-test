export class Course {
  public courseImagePath: string;
  public instructorName: string;
  public instructorImagePath: string;
  public courseName: string;
  public courseDuration: string;
  public coursePrice: number;
  public courseRating: number;
  public courseId: number;
  public doesUserRegistered: boolean;
  constructor(
    courseName: string,
    courseImagePath: string,
    instructorImagePath: string,
    instructorName: string,
    courseDuration: string,
    coursePrice: number,
    courseRating: number,
    courseId: number,
    doesUserRegistered: boolean
  ) {
    this.courseId = courseId;
    this.courseImagePath = courseImagePath;
    this.courseName = courseName;
    this.instructorImagePath = instructorImagePath;
    this.instructorName = instructorName;
    this.courseDuration = courseDuration;
    this.coursePrice = coursePrice;
    this.courseRating = courseRating;
    this.doesUserRegistered = doesUserRegistered;
  }
}
