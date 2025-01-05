import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  error: { [key: string]: string } = {}
  email: string = '';
  password: string = '';
  loggedin: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('loggedin') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/employee']);
    }
  }


  Onlogin(): void {

    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.success) {
          // Store all necessary information in localStorage
          localStorage.setItem('loggedin', 'true');
          localStorage.setItem('name', response.fullname);
          localStorage.setItem('email', response.email);
          localStorage.setItem('role', response.role);
          localStorage.setItem('id', response.id);
          if (response.role == "employee") {
            this.router.navigate(['/employee']);
          }
        } else {
          this.error["LoginError"] = response.message || 'Invalid credentials.';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.error["serverError"] = 'Server error. Please try again later.';
      }
    );
  }

}
