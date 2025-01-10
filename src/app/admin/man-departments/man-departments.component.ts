import { UsersService } from './../../shared/services/users.service';
import { SharedModule } from './../../shared/shared.module';
import { DepartmentsService } from './../../shared/services/departments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-man-departments',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './man-departments.component.html',
  styleUrl: './man-departments.component.scss'
})
export class ManDepartmentsComponent implements OnInit {
  departments: any[] = [];
  users: any[] = [];

  constructor(private DepartmentsService: DepartmentsService, private usersService: UsersService) { }
  ngOnInit(): void {
    this.getDepartments();
    this.getUsers();
  }

  // Get users
  getUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data
    })
  }

  //get departments
  getDepartments() {
    this.DepartmentsService.getDepartments().subscribe(data => {
      this.departments = data;
      console.log(this.departments)
    })
  }

  getUserName(user_id: number) {
    for (let i = 0; i < this.users.length; i++) {
      const element = this.users[i];
      if (element.id == user_id) {
        return element.full_name
      }
    }
  }

}
