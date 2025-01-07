import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
    constructor( private router: Router) { }
  ngOnInit(): void {
    // Controle access
    const isLoggedIn = sessionStorage.getItem('loggedin') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
    if (sessionStorage.getItem('role') === 'admin') {
      this.router.navigate(['/admin']);
    }
  }
}
