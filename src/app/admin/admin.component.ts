import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  constructor(private router : Router){}
  ngOnInit(): void {
    const isLoggedin = sessionStorage.getItem('loggedin');
    if (!isLoggedin) {
      this.router.navigate(['/login'])
    }
  }
}
