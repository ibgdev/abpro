import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  error: { [key: string]: string } = {}
  full_name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword:  string = '';
  department: string = '';

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    const isLoggedIn = sessionStorage.getItem('loggedin') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/employee']);
    }
  }
  onRegister() {
  }
}
