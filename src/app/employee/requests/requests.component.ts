import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CongeComponent } from './conge/conge.component';
import { MaterielComponent } from "./materiel/materiel.component";
import { AvanceComponent } from "./avance/avance.component";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [SharedModule, CongeComponent, MaterielComponent, AvanceComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {

  viewSection: string = 'newDemande';
  demandes = [];
  TypeDemade: string[] = ['Congé', 'Matériel', 'Avance', 'Sortie']

  newDemande: string = '';

  handleCongeData(congeData: string) {
    // send demande
    console.log(congeData);

    // close form
    this.newDemande = '';
  }

  handleMaterielData(materielData: string) {
    // send demande
    console.log(materielData);

    // close form
    this.newDemande = '';
  }


  handleAvancelData(avanceData: string) {
    // send demande
    console.log(avanceData);

    // close form
    this.newDemande = '';
  }

  sendDemande() {

  }
}
