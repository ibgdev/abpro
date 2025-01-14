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
    const isLoggedIn = sessionStorage.getItem('loggedin') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/employee']);
    }
  }


  Onlogin(): void {

    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.success) {
          // Store all necessary information in localStorage
          sessionStorage.setItem('loggedin', 'true');
          sessionStorage.setItem('name', response.fullname);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('id', response.id);
          sessionStorage.setItem('department_id', response.department_id)
          if (response.role == "employee") {
            this.router.navigate(['/employee']);
          }else if (response.role == "admin") {
            this.router.navigate(['/admin'])
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
