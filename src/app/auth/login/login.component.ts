import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error: string | null = null;
  isPending = false;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  checkIsButtonDisabled(form: NgForm): boolean {
    if (form.invalid) {
      return true;
    }

    if (form.value.password?.length < 8) {
      return true;
    }

    if (this.isPending) {
      return true;
    }
    return false;
  }

  onSubmit(form: NgForm) {
    this.isPending = true;

    this.authService.login(form.value.email, form.value.password).subscribe({
      next: (data) => {
        this.cookieService.set('idToken', data.idToken);
        this.authService.isUserLoggedIn = true;
        form.reset();
        this.router.navigate(['my-courses']);
      },
      error: (error) => {
        this.error = error;
        this.authService.isUserLoggedIn = false;
      },
      complete: () => {
        this.isPending = false;
      },
    });
  }
}
