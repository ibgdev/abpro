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
  attendanceData: { date: string; status: string }[] = []; // Attendance data from the database

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAttendanceData(); // Fetch attendance data
  }

  fetchAttendanceData() {
    // Replace with your API endpoint to fetch attendance data
    this.http.get<{ date: string; status: string }[]>('http://localhost:8080/presence/getPresences.php').subscribe(
      (data) => {
        this.attendanceData = data; // Store attendance data
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
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day).toISOString().split('T')[0];
      const attendanceEntry = this.attendanceData.find((entry) => entry.date === date);
      const status = attendanceEntry ? attendanceEntry.status || 'unknown' : 'unknown'; // Set to 'unknown' if empty
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
