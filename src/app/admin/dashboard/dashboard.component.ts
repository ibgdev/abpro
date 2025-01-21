import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { PresenceService } from '../../shared/services/presence.service';
import { DepartmentsService } from '../../shared/services/departments.service';
import { RequestService } from '../../shared/services/request.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  employees : any[] = [];
  departments: any[] = [];
  presenceData: any[] = [];
  absenceData: any[] = [];
  absenceLabels: string[] = [];
  acceptedRequests: number = 0;
  refusedRequests: number = 0;
  pendingRequests: number = 0;

  constructor(private usersService: UsersService, private presenceService: PresenceService, private departmentsService: DepartmentsService, private requestService: RequestService) {}
  ngOnInit(): void {
    // Fetch total employees
    this.usersService.getUsers(null).subscribe((data: any) => {
      this.employees = data;
      this.totalEmployees = this.employees.length;
    });

  
    // Fetch department data
    this.departmentsService.getDepartments().subscribe((data: any[]) => {
      this.departments = data.map((dept: any) => ({
        id: dept.id,
        name: dept.department_name
      }));
    });
  
  
    // Fetch request data
    this.requestService.getRequests(null).subscribe((data: any[]) => {
      this.acceptedRequests = data.filter((req: any) => req.status === 'accepté').length;
      this.refusedRequests = data.filter((req: any) => req.status === 'refusé').length;
      this.pendingRequests = data.filter((req: any) => req.status === 'en attente').length;
    });
  }

  getEmpNumDep(Depid : string){
    let s = 0;
    for (let i = 0; i < this.employees.length; i++) {
      const element = this.employees[i];
      if (element.department_id == Depid) {
        s++;
      }
    }
    return s
  }
}