import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-autre',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './autre.component.html',
  styleUrl: './autre.component.scss'
})
export class AutreComponent {
  user = {"name": sessionStorage.getItem("name"), "email": sessionStorage.getItem("email") }
  objetDemande: string = '';
  descriptionDemande: string = '';
  
  @Output() autreData = new EventEmitter<string>();
  
  
  sendAutreDemande() {
    const demandeText = `
    Type de demande: Autre
    Objet demandés: ${this.objetDemande}
    descriptionDemande: ${this.descriptionDemande}
  `
  this.autreData.emit(demandeText)
  }
}
