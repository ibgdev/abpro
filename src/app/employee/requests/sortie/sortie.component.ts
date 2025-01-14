import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-sortie',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sortie.component.html',
  styleUrl: './sortie.component.scss'
})
export class SortieComponent {
  user = { "name": sessionStorage.getItem("name"), "email": sessionStorage.getItem("email") }
  dateSortie: string = '';
  heureDebut: string = '';
  heureFin: string = '';
  raison: string = '';

  @Output() sortieData = new EventEmitter<string>();
  sendDemandeAutorisation() {
    const demandeText = `
    Type de demande: Autorisation de Sortie
    Date de sortie: ${this.dateSortie}
    Heure de début: ${this.heureDebut}
    Heure de fin: ${this.heureFin}
    Raison: ${this.raison}
    `;

    this.sortieData.emit(demandeText);
  }


}
