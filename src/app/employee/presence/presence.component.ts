import { Component, OnInit } from '@angular/core';
import { DigitalClockComponent } from "../../digital-clock/digital-clock.component";
import { FooterComponent } from "../../footer/footer.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presence',
  standalone: true,
  imports: [DigitalClockComponent, SweetAlert2Module],
  templateUrl: './presence.component.html',
  styleUrl: './presence.component.scss'
})
export class PresenceComponent implements OnInit {
  currentTime: string = '';
  isDisabled: boolean = false;
  swal : any  
  ngOnInit(): void {
    const date = new Date();
    this.currentTime = date.toLocaleTimeString('fr-FR', { hour12: false });

    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();

    if (currentHour < 8 || currentHour > 17 || (currentHour === 17 && currentMinute > 0)) {
      this.isDisabled = true;
    }    

  }

  arivee(){
    Swal.fire({
      title: 'Welcome!',
      text: 'Vous avez marqué votre arrivée avec succès.',
      icon: 'success',
      confirmButtonText: 'Confirmer',
      customClass: {
        confirmButton: 'custom-confirm-button', 
      }
    });
  }

  depart(){
    Swal.fire({
      title: 'Good Bye !',
      text: 'Vous avez marqué votre Départ avec succès.',
      icon: 'success',
      confirmButtonText: 'Confirmer',
      customClass: {
        confirmButton: 'custom-confirm-button', 
      }
    });
  }

}
