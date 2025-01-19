import { Component, OnInit } from '@angular/core';
import { DigitalClockComponent } from "../../digital-clock/digital-clock.component";;
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { PresenceService } from '../../shared/services/presence.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-presence',
  standalone: true,
  imports: [DigitalClockComponent, SweetAlert2Module, SharedModule],
  templateUrl: './presence.component.html',
  styleUrl: './presence.component.scss'
})
export class PresenceComponent implements OnInit {
  currentTime: Date = new Date();
  isArrivalDisabled: boolean = false;
  isDepartureDisabled: boolean = false;
  userId = sessionStorage.getItem("id");
  hasArrivedFlag: boolean = false;
  hasdepartedFlag: boolean = false;
  swal : any  
  showContent: boolean = false;
  constructor(private presenceService: PresenceService) {}

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.checkHasArrived();
    this.checkHasDeparted();
    
    setTimeout(() => {
      this.showContent = true;
    }, 1000); 
  }
  updateTime(): void {
    this.currentTime = new Date();
    this.checkButtonStatus();
  }
  
  checkButtonStatus(): void {
    const hour = this.currentTime.getHours();
    
    // Arrival can be marked between 8:00 AM and 10:00 AM
    this.isArrivalDisabled = hour < 8 || hour >= 16 || this.hasArrivedFlag;
    
    // Departure can be marked between 8:00 AM and 5:00 PM
    this.isDepartureDisabled = hour < 8 || hour >= 17 || !this.hasArrivedFlag || this.hasdepartedFlag;
  }
  
  checkHasArrived(): void {
    this.presenceService.hasArrived(this.userId).subscribe(
      (hasArrived: boolean) => {
        this.hasArrivedFlag = hasArrived;
      },
      (error: any) => {
        console.error('Error checking arrival status:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while checking arrival status.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  checkHasDeparted(): void {
    this.presenceService.hasDepart(this.userId).subscribe(
      (hasdeparted: boolean) => {
        this.hasdepartedFlag = hasdeparted;
      },
      (error: any) => {
        console.error('Error checking depart status:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while checking depart status.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
  arivee(): void {
    this.presenceService.markArrival(this.userId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          Swal.fire({
            title: 'Welcome!',
            text: 'Vous avez marqué votre arrivée avec succès.',
            icon: 'success',
            confirmButtonText: 'Confirmer'
          });
          this.checkHasArrived()
          this.checkButtonStatus();
          
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Erreur lors de l\'enregistrement de l\'arrivée.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: 'Une erreur s\'est produite lors de la communication avec le serveur.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  depart(): void {
    this.presenceService.markDeparture(this.userId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          Swal.fire({
            title: 'Good Bye!',
            text: 'Vous avez marqué votre départ avec succès.',
            icon: 'success',
            confirmButtonText: 'Confirmer'
          });
          this.checkHasDeparted()
          this.checkButtonStatus();
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Erreur lors de l\'enregistrement du départ.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: 'Une erreur s\'est produite lors de la communication avec le serveur.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

}
