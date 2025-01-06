import { Component } from '@angular/core';
import { CalendarComponent } from "../../calendar/calendar.component";

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss'
})
export class HistoriqueComponent {

  date = new Date();

  getMonth(): string {
    let monthKey = this.date.getMonth();
    switch (monthKey) {
      case 0:
        return "Janvier";
      case 1:
        return "Février";
      case 2:
        return "Mars";
      case 3:
        return "Avril";
      case 4:
        return "Mai";
      case 5:
        return "Juin";
      case 6:
        return "Juillet";
      case 7:
        return "Août";
      case 8:
        return "Septembre";
      case 9:
        return "Octobre";
      case 10:
        return "Novembre";
      case 11:
        return "Décembre";
      default:
        return "Mois inconnu";
    }
  }

}

