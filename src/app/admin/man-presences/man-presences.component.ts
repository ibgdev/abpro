import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PresenceService } from '../../shared/services/presence.service';
import { UsersService } from '../../shared/services/users.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-man-presences',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './man-presences.component.html',
  styleUrl: './man-presences.component.scss'
})
export class ManPresencesComponent implements OnInit {
  presences : any[] = []
  users : any[] = []
  filteredpresence : any[] = []
  searchDate: string = '';

  constructor(private presenceservice : PresenceService, private usersService : UsersService){}
  ngOnInit(): void {
    this.getPresences()
    this.getUsers()
  }

  getPresences(){
    const dep_id = sessionStorage.getItem("department_id")
    this.presenceservice.getPresence(dep_id).subscribe(
      data => {
        this.presences = data
        this.filteredpresence = [...this.presences];
        console.log(data, "working")
      }
    );
  }

  applyFilters() {
    this.filteredpresence = this.presences.filter(presence =>
      !this.searchDate || presence.date === this.searchDate
    );
  }

    // Get users
    getUsers() {
      this.usersService.getUsers(sessionStorage.getItem("department_id")).subscribe(data => {
        this.users = data;
      });
    }

    getUserName(user_id: number) {
      for (let i = 0; i < this.users.length; i++) {
        const element = this.users[i];
        if (element.id == user_id) {
          return element.full_name;
        }
      }
    }

    exportToExcel() {
      const filteredPresences = this.filteredpresence;
    
      if (filteredPresences.length === 0) {
        alert('Aucune donnée à exporter.');
        return;
      }
    
      const worksheetData = filteredPresences.map(presence => ({
        ID: presence.id,
        Username: this.getUserName(presence.user_id),
        'Temps d\'arrivée': presence.check_in_time,
        'Temps de départ': presence.check_out_time,
        Date: presence.date,
        Status: presence.status
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Présences');
    
      XLSX.writeFile(workbook, 'Présences.xlsx');
    }
}

