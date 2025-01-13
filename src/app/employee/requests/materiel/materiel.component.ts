import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-materiel',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './materiel.component.html',
  styleUrl: './materiel.component.scss'
})
export class MaterielComponent {
  user = { "name": sessionStorage.getItem("name"), "email": sessionStorage.getItem("email") }
  materiel: string = '';
  raison: string = '';

  @Output() materielData = new EventEmitter<string>()

sendDemandeMateriel() {
  const demandeText = `
  Type de demande: Matériel
  Matérial demandés: ${this.materiel}
  Raison: ${this.raison}
`
this.materielData.emit(demandeText);
}

}
