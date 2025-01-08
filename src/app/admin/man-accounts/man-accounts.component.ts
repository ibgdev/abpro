import { DepartmentsService } from './../../shared/services/departments.service';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

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
  constructor(private usersService: UsersService, private DepartmentsService : DepartmentsService) { }
  ngOnInit(): void {
    this.getUsers()
    this.getDepartments()
  }

  // Get users
  getUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data
    })
  }

  // Add department to user in the table
  getDepartments(){
    this.DepartmentsService.getDepartments().subscribe(data => {
      this.departments = data;
    })
  }
  getDepartmentName(dep_id : number) {
    if (dep_id == null) {
      return "Pas de departement"
    }
    for (let i = 0; i < this.departments.length; i++) {
      const element = this.departments[i];
      if (element.id == dep_id) {
        return element.department_name
      }
    }
  }
}
