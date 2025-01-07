import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  name = sessionStorage.getItem("name");
  constructor(private router : Router){}
  ngOnInit(): void {
    
  }
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
