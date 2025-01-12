import { Component, model, OnInit } from '@angular/core';
import { DepartmentsService } from './../../shared/services/departments.service';
import { UsersService } from './../../shared/services/users.service';
import Swal from 'sweetalert2';
import { SharedModule } from '../../shared/shared.module';

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
  department_id: string = '';
  user: string = '';
  error: any = {}; 
  availableAdmins: any[] = []; 

  constructor(private DepartmentsService: DepartmentsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getUsers();
  }

  // Get users
  getUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      this.filterUnassignedAdmins(); 
    });
  }
  filterUnassignedAdmins() {
    const assignedAdminIds = this.departments.map(department => department.admin_id);
    this.availableAdmins = this.users.filter(user => 
      user.role === 'admin' && !assignedAdminIds.includes(user.id) && user.id != 0
    );
  }

  // Get departments
  getDepartments() {
    this.DepartmentsService.getDepartments().subscribe(data => {
      this.departments = data;
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
    this.DepartmentsService.addDepartment(this.department_id,this.department_name, this.user).subscribe(
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
  settings(department_id: any, department_name: any,admin_id : any) {
    this.department_id = department_id;
    this.department_name = department_name;
    this.user = admin_id;
    this.filterUnassignedAdmins();
  }

  // delete department 
    deleteDepartment(id: number) {
      Swal.fire({
        text: 'Tu veut supprimer ce departement ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler',  
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.DepartmentsService.deleteDepartment(id).subscribe(
            (response) => {
              if (response.success) {
                this.getDepartments();
                Swal.fire({
                  text: 'department supprimé avec succès ?',
                  icon: 'success',
                  confirmButtonText: 'Okey',})
              } else {
                this.error["DepartmentError"] = response.message || 'Invalid credentials.';
              }
            }
          );
        } else if (result.isDismissed) {
          console.log('Deletion cancelled');
        }
      });
    }
}

