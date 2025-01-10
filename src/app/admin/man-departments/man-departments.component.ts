import { Component, model, OnInit } from '@angular/core';
import { DepartmentsService } from './../../shared/services/departments.service';
import { UsersService } from './../../shared/services/users.service';
import Swal from 'sweetalert2';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';

// Define an interface for the response
interface DepartmentResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-man-departments',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './man-departments.component.html',
  styleUrls: ['./man-departments.component.scss']
})
export class ManDepartmentsComponent implements OnInit {
  departments: any[] = [];
  users: any[] = [];
  department_name: string = '';
  user: string = ''; 
  error: any = {};  // Initialize error object

  constructor(private DepartmentsService: DepartmentsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getUsers();
  }

  // Get users
  getUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  // Get departments
  getDepartments() {
    this.DepartmentsService.getDepartments().subscribe(data => {
      this.departments = data;
      console.log(this.departments);
    });
  }

  // Get user full name from user ID
  getUserName(user_id: number) {
    for (let i = 0; i < this.users.length; i++) {
      const element = this.users[i];
      if (element.id == user_id) {
        return element.full_name;
      }
    }
  }
  
  // Add new department
  addDepartment() {
    console.log("hi")
    this.DepartmentsService.addDepartment(this.department_name, this.user).subscribe(
      (response) => { 
        if (response.success) {
          Swal.fire({
            title: 'Succès!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Confirmer',
          }).then(() => {
            this.getDepartments();
          });
        }
      },
      (error) => {
        this.error["registerError"] = error.error?.message || 'Une erreur est survenue.';
      }
    );

    this.resetForm();
    const closeModalButton = document.querySelector('.btn-close') as HTMLElement;
    closeModalButton?.click();
  }

  resetForm() {
    this.department_name = '';
    this.user = '';
  }
}

