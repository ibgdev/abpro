import Swal from 'sweetalert2';
import { AbsencesService } from './../../shared/services/absences.service';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-man-absences',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './man-absences.component.html',
  styleUrl: './man-absences.component.scss'
})
export class ManAbsencesComponent implements OnInit {
  constructor(private absencesservice: AbsencesService) { }
  absences: any[] = []
  ngOnInit(): void {
    this.getAbsences()
  }

  getAbsences() {
    this.absencesservice.getAbsences(sessionStorage.getItem("department_id")).subscribe(data => {
      this.absences = data
    })
  }

  markAbsent(id: string | null,email: string, fullname: string) {
    this.absencesservice.markAbsent(id).subscribe(response => {
      Swal.fire({
        title: 'Succès!',
        text: response.message,
        icon: 'success',
        confirmButtonText: 'Confirmer',
      }).then(() => {
        this.sendEmail(email,fullname)
        this.getAbsences();
      });
    })
  }

  sendEmail(email: string, fullname: string) {
    this.absencesservice.sendEmail(email, fullname).subscribe(
      (response) => {
        console.log(response)
        Swal.fire({
          title: 'Email envoyé!',
          text: `Un email a été envoyé à ${fullname} (${email}).`,
          icon: 'success',
          confirmButtonText: 'Confirmer',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Erreur!',
          text: 'Impossible d’envoyer l’email. Veuillez réessayer.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
