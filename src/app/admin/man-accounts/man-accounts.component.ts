import { RegisterService } from './../../shared/services/register.service';
import { DepartmentsService } from './../../shared/services/departments.service';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import Swal from 'sweetalert2';
import { ExportService } from '../../shared/services/export.service';

@Component({
  selector: 'app-man-accounts',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './man-accounts.component.html',
  styleUrl: './man-accounts.component.scss'
})
export class ManAccountsComponent implements OnInit {


  users: any[] = [];
  departments: any[] = [];
  error: { [key: string]: string } = {}
  isSuperAdmin = sessionStorage.getItem('id') == '0'
  addUser : boolean = true;
  full_name: string = '';
  email: string = '';
  password: string = '';
  department: string = '';
  role: string = 'employee';
  searchTerm: string = '';
  working: string = '';

  constructor(private usersService: UsersService,
    private DepartmentsService: DepartmentsService,
    private RegisterService: RegisterService,
    private excelExportService: ExportService,
  ) { }
  ngOnInit(): void {
    this.getUsers()
    this.getDepartments()
  }

  // Get users
  getUsers() {
    this.usersService.getUsers(sessionStorage.getItem("department_id")).subscribe(data => {
      this.users = data
    })
  }

  workingedit(msg: string, edit : boolean) {
    this.working = msg;
    this.addUser = edit;
  }
  //filtred users

  filteredUsers() {
    return this.users.filter(user => {
      return (
        user.full_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  // Add department to user in the table
  getDepartments() {
    this.DepartmentsService.getDepartments().subscribe(data => {
      this.departments = data;
    })
  }
  getDepartmentName(dep_id: number) {
    if (dep_id == null) {
      return "Pas de departement"
    }
    for (let i = 0; i < this.departments.length; i++) {
      const element = this.departments[i];
      if (element.id == dep_id) {
        return element.department_name
      }
    }
    return "Pas de departement"
  }
  //Add New User
  addAccount() {
    if (this.full_name && this.email && this.password && this.department) {
      const data = {
        fullname: this.full_name,
        email: this.email,
        password: this.password,
        department: this.department,
        role: this.role
      };


      this.RegisterService.register(data.fullname, data.email, data.password, data.department, data.role).subscribe(
        (response) => {
          if (response.success) {
            Swal.fire({
              title: 'Succès!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Confirmer',
            }).then(() => {
              this.addUser = false;
              this.getUsers();
            });
          } else {
            this.error["registerError"] = response.message || 'Registration failed.';
            Swal.fire({
              title: 'erreur!',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'Confirmer',
            })
          }
        },
        (error) => {
          this.error["registerError"] = error.error?.message || 'An error occurred.';
        }

      )

      this.resetForm();
      const closeModalButton = document.querySelector('.btn-close') as HTMLElement;
      closeModalButton?.click();
    }
  }

  updateAccount(){
    if (this.full_name && this.email && this.password && this.department) {
      const data = {
        fullname: this.full_name,
        email: this.email,
        password: this.password,
        department: this.department,
        role: this.role
      };


      this.RegisterService.updateUser(data.fullname, data.email, data.password, data.department, data.role).subscribe(
        (response) => {
          if (response.success) {
            Swal.fire({
              title: 'Succès!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Confirmer',
            }).then(() => {
              this.addUser = false;
              this.getUsers();
            });
          } else {
            this.error["registerError"] = response.message || 'Registration failed.';
          }
        },
        (error) => {
          this.error["registerError"] = error.error?.message || 'An error occurred.';
        }

      )

      this.resetForm();
      const closeModalButton = document.querySelector('.btn-close') as HTMLElement;
      closeModalButton?.click();
    }
  }

  resetForm() {
    this.full_name = '';
    this.email = '';
    this.password = '';
    this.department = '';
    this.role = 'employee';
  }

  // edit user settings
  settings(userId: number, fullname: string, email: string, password: string, department: string, role: string) {
    this.working = "Ajouter Nouveau Utilisateur";
    this.full_name = fullname;
    this.email = email;
    this.password = password;
    this.department = department;
    this.role = role;
  }
  //export excel

  exportData() {
    this.excelExportService.exportToExcel().subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'employees.xlsx'; // File name
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  //delete employee

  deleteEmployee(id: number) {
    Swal.fire({
      text: 'Tu veut supprimer ce compte ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe(
          (response) => {
            if (response.success) {
              this.getUsers();
              Swal.fire({
                text: 'Utilisateur supprimé avec succès ?',
                icon: 'success',
                confirmButtonText: 'Okey',
              })
            } else {
              this.error["LoginError"] = response.message || 'Invalid credentials.';
            }
          }
        );
      } else if (result.isDismissed) {
        console.log('Deletion cancelled');
      }
    });
  }
}