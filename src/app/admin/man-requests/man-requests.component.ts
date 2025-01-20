import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MandemandeService } from '../../shared/services/mandemande.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  users: any[] = [];

  filteredDemandes = [...this.demandes];
  demandStatuses: string[] = ['accepté', 'refusé', 'en attente'];
  paginatedDemandes: any[] = [];
  demandTypes: string[] = [];
  searchEmployee: string = '';
  searchType: string = '';
  searchDate: string = '';
  searchStatus: string = '';

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private MandemandeService: MandemandeService, private usersService: UsersService) {}

  ngOnInit() {
    this.fetchDemandes();
    this.getusers();
    this.updatePagination();
  }

  getusers() {
    this.usersService.getUsers(sessionStorage.getItem("department_id")).subscribe(
      data => {
        this.users = data;
      }
    );
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
    const DepId = sessionStorage.getItem("department_id") == 'null' ? null : sessionStorage.getItem("department_id");
    this.MandemandeService.getRequests(DepId).subscribe((data) => {
      this.demandes = data;
      this.filteredDemandes = [...this.demandes];
      this.demandTypes = Array.from(new Set(this.demandes.map(d => d.type)));
      this.updatePagination();
    });
  }

  applyFilters() {
    this.filteredDemandes = this.demandes.filter(demande =>
      (!this.searchEmployee || demande.user_id == this.searchEmployee) &&
      (!this.searchType || demande.type == this.searchType) &&
      (!this.searchDate || demande.created_at.split(' ')[0] == this.searchDate) &&
      (!this.searchStatus || demande.status == this.searchStatus)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredDemandes.length / this.itemsPerPage);
    this.paginatedDemandes = this.filteredDemandes.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  printDemande(id: string) {
    console.log(`Printing details for demande ID: ${id}`);
    const demande = this.demandes.find(d => d.id === id);
    if (!demande) {
      console.error('Demande not found!');
      return;
    }

    const content = `
    <div style="font-family: Arial, sans-serif; margin: 20px;">
      <h1 style="text-align: center; color: #4CAF50;">Demande Details</h1>
      <hr style="border: 1px solid #ddd; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">ID:</td>
          <td style="padding: 8px;">${demande.id}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Employé:</td>
          <td style="padding: 8px;">${this.getUserName(demande.user_id)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Type:</td>
          <td style="padding: 8px;">${demande.type}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Détails:</td>
          <td style="padding: 8px;">${demande.Details}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Date:</td>
          <td style="padding: 8px;">${demande.created_at}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Statut:</td>
          <td style="padding: 8px;">${demande.status}</td>
        </tr>
      </table>
      <hr style="border: 1px solid #ddd; margin-top: 20px;">
      <footer style="text-align: center; font-size: 12px; color: #888;">
        Generated by the System - ${new Date().toLocaleDateString()}
      </footer>
    </div>
    `;

    // Create an invisible container to render content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.innerHTML = content;
    document.body.appendChild(tempDiv);

    // Convert the container to canvas and generate PDF
    html2canvas(tempDiv).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, canvas.height * 180 / canvas.width);
      pdf.save(`demande_${id}.pdf`);
      document.body.removeChild(tempDiv);
    });
  }

  acceptDemande(id: string) {
    this.MandemandeService.updateRequestStatus(id, 'accepté', sessionStorage.getItem('id')).subscribe(
      () => {
        this.fetchDemandes();
        this.applyFilters();
      },
      error => {
        console.error('Error accepting demande:', error);
      }
    );
  }

  rejectDemande(id: string) {
    this.MandemandeService.updateRequestStatus(id, 'refuse', sessionStorage.getItem('id')).subscribe(
      () => {
        this.fetchDemandes();
        this.applyFilters();
      },
      error => {
        console.error('Error rejecting demande:', error);
      }
    );
  }
}