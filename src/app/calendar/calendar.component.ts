import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  calendar: { date: string; isCurrentMonth: boolean }[][] = [];

  ngOnInit() {
    this.calendar = this.getCalendarForCurrentMonth();
  }

  getCalendarForCurrentMonth(): { date: string; isCurrentMonth: boolean }[][] {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayWeekIndex = firstDayOfMonth.getDay(); 

    const calendar: { date: string; isCurrentMonth: boolean }[][] = [];
    let week: { date: string; isCurrentMonth: boolean }[] = [];

    for (let i = 0; i < firstDayWeekIndex; i++) {
      week.push({ date: '', isCurrentMonth: false });
    }

    for (let day = 2; day <= daysInMonth+1; day++) {
      week.push({ date: new Date(year, month, day).toISOString().split('T')[0], isCurrentMonth: true });

      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }
    while (week.length < 7) {
      week.push({ date: '', isCurrentMonth: false });
    }
    
    if (week.length) {
      calendar.push(week);
    }

    return calendar;
  }
  
}
