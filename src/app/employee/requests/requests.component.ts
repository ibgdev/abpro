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
export class RequestsComponent implements OnInit{
  error: any;
  demandes : any[] = [];
  filterType: string = ''
  user = { "id": sessionStorage.getItem("id"),"name": sessionStorage.getItem("name"), "email": sessionStorage.getItem("email") }
  constructor(private RequestService: RequestService) { }

  ngOnInit(): void {
    this.getDemandes()
    console.log(this.demandes)
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
    getDemandes(){
      this.RequestService.getRequests().subscribe(data => {
        if (this.filterType) {
          this.demandes = data.filter((demande: { type: string; }) => demande.type === this.filterType);
        } else {
          this.demandes = data; // Show all demandes if no filter is applied
        }
      });
    }
    onFilterChange() {
      this.getDemandes();
    }
}

