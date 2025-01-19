import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  calendar: { date: string; isCurrentMonth: boolean; status: string }[][] = [];
  attendanceData: { date: string; status: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAttendanceData(); 
  }

  fetchAttendanceData() {
    this.http.get<{ date: string; status: string }[]>('http://localhost:8080/presence/getPresences.php?id='+sessionStorage.getItem('id')).subscribe(
      (data) => {
        this.attendanceData = data;
        this.calendar = this.getCalendarForCurrentMonth();
      },
      (error) => {
        console.error('Error fetching attendance data:', error);
      }
    );
  }

  getCalendarForCurrentMonth(): { date: string; isCurrentMonth: boolean; status: string }[][] {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayWeekIndex = firstDayOfMonth.getDay();

    const calendar: { date: string; isCurrentMonth: boolean; status: string }[][] = [];
    let week: { date: string; isCurrentMonth: boolean; status: string }[] = [];

    // Add blank days before the first day of the current month
    for (let i = 0; i < firstDayWeekIndex; i++) {
      week.push({ date: '', isCurrentMonth: false, status: '' });
    }

    // Add days of the current month
    for (let day = 2; day <= daysInMonth+1; day++) {
      const date = new Date(year, month, day).toISOString().split('T')[0];
      const attendanceEntry = this.attendanceData.find((entry) => entry.date === date);
      const status = attendanceEntry ? attendanceEntry.status || '' : ''; 
      week.push({ date, isCurrentMonth: true, status });

      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // Add blank days after the last day of the current month
    while (week.length < 7) {
      week.push({ date: '', isCurrentMonth: false, status: '' });
    }

    if (week.length) {
      calendar.push(week);
    }

    return calendar;
  }
}
