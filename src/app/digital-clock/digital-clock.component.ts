import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  standalone: true,
  imports: [],
  templateUrl: './digital-clock.component.html',
  styleUrl: './digital-clock.component.scss'
})
export class DigitalClockComponent implements OnInit {
  currentTime: string = '';
  currentDate: string = '';

  ngOnInit() {
    setInterval(() => {
      const date = new Date();
      this.currentTime = date.toLocaleTimeString('fr-FR');
      this.currentDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }); 
    }, 1000);
  }
}
