import { DepartmentsService } from './../shared/services/departments.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { RegisterService } from '../shared/services/register.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule,SweetAlert2Module],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  departments: any[] = [];
  error: { [key: string]: string } = {}
  full_name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  selectedDepartment: string = '';
  role: string = 'employee';

  constructor(private router: Router, private DepartmentsService: DepartmentsService, private registerService: RegisterService) { }

  ngOnInit(): void {
    const isLoggedIn = sessionStorage.getItem('loggedin') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/employee']);
    }
    this.getDepartments()
  }

  getDepartments() {
    this.DepartmentsService.getDepartments().subscribe(data => {
      this.departments = data;
    })
  }
  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.error["passwordMismatch"] = "Passwords do not match.";
      return;
    }

    this.registerService.register(this.full_name, this.email, this.password, this.selectedDepartment,this.role).subscribe(
      (response) => {
        if (response.success) {
          Swal.fire({
            title: 'Succès!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Confirmer',
          })
          this.router.navigate(['/login']);
        } else {
          this.error["registerError"] = response.message || 'Registration failed.';
          Swal.fire({
            title: 'Erreur!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Confirmer',
          }
          );
        }
      },
      (error) => {
        this.error["registerError"] = error.error?.message || 'An error occurred.';
        
      }
    );
  }

}

