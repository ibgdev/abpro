import { RequestService } from './../../shared/services/request.service';
import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CongeComponent } from './conge/conge.component';
import { MaterielComponent } from "./materiel/materiel.component";
import { AvanceComponent } from "./avance/avance.component";
import { SortieComponent } from "./sortie/sortie.component";
import Swal from 'sweetalert2';
import { AutreComponent } from "./autre/autre.component";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [SharedModule, CongeComponent, MaterielComponent, AvanceComponent, SortieComponent, AutreComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  error: any;
  demandes: any[] = [];
  filterType: string = '';
  filterStatus: string = '';
  filterDate: string = '';

  filteredDemandes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;


  user = { "id": sessionStorage.getItem("id"), "name": sessionStorage.getItem("name"), "email": sessionStorage.getItem("email") }
  constructor(private RequestService: RequestService) { }

  ngOnInit(): void {
    if (this.user.id) {
      this.getDemandes();
    } else {
      console.error('User ID is not available');
    }
  }

  viewSection: string = 'viewDemandes';
  TypeDemade: string[] = ['Congé', 'Matériel', 'Avance', 'Sortie', 'Autre']

  newDemande: string = '';

  //Nouvelle demande section :
  handleCongeData(congeData: string) {
    // send demande
    this.sendDemande(this.user.id!, "Congé", congeData)

    // close form
    this.newDemande = '';
  }

  handleMaterielData(materielData: string) {
    // send demande
    this.sendDemande(this.user.id!, "Matériel", materielData)

    // close form
    this.newDemande = '';
  }


  handleAvancelData(avanceData: string) {
    // send demande
    this.sendDemande(this.user.id!, "Avance", avanceData)

    // close form
    this.newDemande = '';
  }

  handleSortielData(sortieData: string) {
    // send demande
    this.sendDemande(this.user.id!, "Sortie", sortieData)

    // close form
    this.newDemande = '';
  }

  handleAutrelData(autreData: string) {
    // send demande
    this.sendDemande(this.user.id!, "Autre", autreData)

    // close form
    this.newDemande = '';
  }

  sendDemande(user_id: string, type: string, details: string) {
    this.RequestService.addRequest(user_id, type, details).subscribe(
      (response) => {
        if (response.success) {
          Swal.fire({
            title: 'Succès!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Confirmer',
          })
        } else {
          this.error["DemandeError"] = 'request failed.';
        }
      }
    );
  }

  //Mes Demandes :
  getDemandes() {
    if (this.user.id) {
      this.RequestService.getRequests(this.user.id).subscribe(data => {
        const filteredData = data.filter((demande: { type: string; status: string; created_at: string }) => {
          const matchesType = this.filterType ? demande.type === this.filterType : true;
          const matchesStatus = this.filterStatus ? demande.status === this.filterStatus : true;

          // Normalize both dates to YYYY-MM-DD
          const createdDate = demande.created_at.split(' ')[0]; // Extract date portion
          const filterDate = this.filterDate ? new Date(this.filterDate).toISOString().split('T')[0] : null;
          
          const matchesDate = filterDate ? createdDate === filterDate : true;
          return matchesType && matchesStatus && matchesDate;
        });

        // Update demandes and pagination
        this.demandes = filteredData;
        this.totalPages = Math.ceil(this.demandes.length / this.itemsPerPage);
        this.updateFilteredDemandes();
      }, error => {
        console.error("Error fetching demandes: ", error);
      });
    }
  }


  updateFilteredDemandes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredDemandes = this.demandes.slice(startIndex, endIndex);
  }


  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateFilteredDemandes();
    }
  }


  onFilterChange() {
    this.currentPage = 1;
    this.getDemandes();
  }
}

