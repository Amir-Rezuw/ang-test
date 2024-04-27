import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, throwError } from 'rxjs';
import { User } from './UserModel';
export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;
  isUserLoggedIn = false;
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    switch (errorResponse?.error?.error?.message.toLowerCase()) {
      case 'email_exists':
        return throwError(() => 'This email already exists.');
      case 'EMAIL_NOT_FOUND'.toLowerCase():
        return throwError(() => 'Email not found');
      case 'INVALID_PASSWORD'.toLowerCase():
        return throwError(() => 'Password is incorrect.');
      case 'INVALID_LOGIN_CREDENTIALS'.toLowerCase():
        return throwError(() => 'Email or Password is incorrect.');
      default:
        return throwError(() => errorMessage);
    }
  }
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    const token = this.cookieService.get('idToken') as string;
    if (token) {
      this.isUserLoggedIn = true;
    }
  }

  signup(userData: User) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY_HERE]',
        { ...userData }
      )
      .pipe(catchError((errorResponse) => this.handleError(errorResponse)));
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY_HERE]',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => this.handleError(errorResponse)),
        tap((resData) => {
          this.autoLogout(+resData.expiresIn * 1000);
        })
      );
  }
  logout() {
    this.cookieService.delete('idToken');
    this.isUserLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
