import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from './../shared/services/departments.service';
import { PasswordChangeService } from '../shared/services/password-change-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  departments: any[] = []
  current_password: string = '';
  new_password: string = '';
  conf_pass: string = '';
  name = sessionStorage.getItem("name");
  email = sessionStorage.getItem("email");
  role = sessionStorage.getItem("role");
  userId = sessionStorage.getItem("id"); 

  constructor(private DepartmentsService: DepartmentsService, private http: HttpClient, private changepasswordservice: PasswordChangeService, private router:Router) {}

  ngOnInit(): void {
    const isLoggedin = sessionStorage.getItem('loggedin');
    if (!isLoggedin) {
      this.router.navigate(['/login'])
    }
    this.getDepartments()
  }
  getDepartments() {
    this.DepartmentsService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  getDepartmentName() {
    const dep_id = sessionStorage.getItem("department_id");
    if (!dep_id) {
      return "Pas de departement";
    }
    const department = this.departments.find((d) => d.id === +dep_id);
    return department ? department.department_name : "Pas de departement";
  }
  
  


  changePassword() {
    // Validate that the new password matches the confirmation password
    if (this.new_password !== this.conf_pass) {
      alert("New passwords do not match.");
      return;
    }

    if (!this.userId) {
      alert("User ID is not available.");
      return;
    }

    // Prepare the data to send to the backend
    const requestData = {
      password: this.new_password
    };

    // Send the request to the backend API to change the password
    this.changepasswordservice.changePassword(this.userId,this.new_password).subscribe(
      response => {
        if (response.success) {
          alert("Password updated successfully.");
        } else {
          alert(response.message || "Error updating password.");
        }
      },
      error => {
        alert("An error occurred while changing the password.");
        console.error(error);
      }
    );
  }
}
