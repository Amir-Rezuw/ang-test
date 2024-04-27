import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  selectedFile?: File;
  userPictureSrc = '../../../assets/picture-placeholder.svg';
  doesPasswordsMatch = true;
  isPostingData = false;
  error: string | null = null;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  checkIsButtonDisabled(form: NgForm): boolean {
    if (form.invalid) {
      return true;
    }
    if (form.value.password !== form.value.passwordConfirmation) {
      return true;
    }
    if (this.isPostingData) {
      return true;
    }
    if (form.value.password?.length < 8) {
      return true;
    }

    return false;
  }

  onSelectPicture(event: Event) {
    const selectedFile = (event.target as HTMLInputElement).files?.[0];
    this.selectedFile = selectedFile;
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.userPictureSrc = base64String;
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  }

  onSubmit(form: NgForm) {
    const formWithFile = { ...form.value, profile: this.userPictureSrc };
    if (formWithFile.password !== formWithFile.passwordConfirmation) {
      this.doesPasswordsMatch = false;
      return;
    }

    this.doesPasswordsMatch = true;
    this.isPostingData = true;
    this.authService.signup(formWithFile).subscribe({
      next: (data) => {
        this.userPictureSrc = '../../../assets/picture-placeholder.svg';
        this.cookieService.set('idToken', data.idToken);
        localStorage.setItem('user', JSON.stringify(formWithFile));
        this.authService.isUserLoggedIn = true;
        this.error = null;
        form.reset();
      },
      error: (error) => {
        this.error = error;
        this.authService.isUserLoggedIn = false;
      },
      complete: () => {
        this.isPostingData = false;
      },
    });
  }
}
