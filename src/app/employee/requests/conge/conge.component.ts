import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-conge',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './conge.component.html',
  styleUrl: './conge.component.scss'
})
export class CongeComponent implements OnInit {
  user = { "name": sessionStorage.getItem("name"), "email": sessionStorage.getItem("email") }
  dateDebut: string = '';
  dateFin: string = '';
  raison: string = '';

  @Output() congeData = new EventEmitter<string>()
  
  ngOnInit(): void {
  }
  sendDemandeConge() {
    const demandeText = `
      Type de demande: Congé
      Date de début: ${this.dateDebut}
      Date de fin: ${this.dateFin}
      Raison: ${this.raison}
    `
    this.congeData.emit(demandeText);
  }




}
