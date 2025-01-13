import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-avance',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './avance.component.html',
  styleUrl: './avance.component.scss'
})
export class AvanceComponent {
  user = { "name": sessionStorage.getItem("name"), "email": sessionStorage.getItem("email") }
  montantAvance: string = '';
  raison: string = '';

  @Output() avanceData = new EventEmitter<string>();
  sendDemandeAvance() {
    const demandeText = `
    Type de demande: Avance
    Montant demandés: ${this.montantAvance}
    Raison: ${this.raison}
  `
  this.avanceData.emit(demandeText)
  }

}
