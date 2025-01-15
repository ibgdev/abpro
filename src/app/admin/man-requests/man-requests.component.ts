import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/services/request.service';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MandemandeService,} from '../../shared/services/mandemande.service';

@Component({
  selector: 'app-man-requests',
  standalone: true,
  imports: [SharedModule, NgSelectModule],
  templateUrl: './man-requests.component.html',
  styleUrls: ['./man-requests.component.scss'],
})
export class ManRequestsComponent implements OnInit {
  demandes: { 
    id: string; 
    user_id: string; 
    type: string; 
    Details: string; 
    status: string; 
    created_at: string; 
  }[] = [];
  users: any[] = []


  filteredDemandes = [...this.demandes];
  demandTypes: string[] = [];
  searchEmployee: string = '';
  searchType: string = '';
  searchDate: string = '';

  constructor(private MandemandeService:MandemandeService, private usersService : UsersService) {}

  ngOnInit() {
    this.fetchDemandes();
    this.getusers()

  }

  getusers(){
    this.usersService.getUsers(sessionStorage.getItem("department_id")).subscribe(
      data => {
        this.users = data
      }
    )
  }

  getUserName(user_id: string) {
    for (let i = 0; i < this.users.length; i++) {
      const element = this.users[i];
      if (element.id == user_id) {
        return element.full_name;
      }
    }
  }

  fetchDemandes() {
    const DepId = sessionStorage.getItem("department_id") == 'null' ?   null :sessionStorage.getItem("department_id")
    this.MandemandeService.getRequests(DepId).subscribe((data) => {
        this.demandes = data;
        console.log(data)
        this.filteredDemandes = [...this.demandes];
        this.demandTypes = Array.from(new Set(this.demandes.map(d => d.type)));
    });
  }
  applyFilters() {
    this.filteredDemandes = this.demandes.filter(demande =>
      (!this.searchEmployee || demande.user_id == this.searchEmployee) &&
      (!this.searchType || demande.type == this.searchType) &&
      (!this.searchDate || demande.created_at.split(' ')[0] == this.searchDate)
    );
  }

  printDemande(id: string) {
    console.log(`Printing details for demande ID: ${id}`);
    // Replace with actual print logic
  }

  acceptDemande(id: string) {
    // this.demandeService.updateDemandeStatus(id, 'accepté').subscribe(() => {
    //   const demande = this.demandes.find(d => d.id === id);
    //   if (demande) {
    //     demande.status = 'accepté';
    //     this.applyFilters();
    //   }
    // });
  }

  rejectDemande(id: string) {
    // this.demandeService.updateDemandeStatus(id, 'refusé').subscribe(() => {
    //   const demande = this.demandes.find(d => d.id === id);
    //   if (demande) {
    //     demande.status = 'refusé';
    //     this.applyFilters();
    //   }
    // });
  }
}
