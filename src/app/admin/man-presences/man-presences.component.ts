import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PresenceService } from '../../shared/services/presence.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-man-presences',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './man-presences.component.html',
  styleUrl: './man-presences.component.scss'
})
export class ManPresencesComponent implements OnInit {
  presences : any[] = []
  users : any[] = []

  constructor(private presenceservice : PresenceService, private usersService : UsersService){}
  ngOnInit(): void {
    this.getPresences()
    this.getUsers()
  }

  getPresences(){
    const dep_id = sessionStorage.getItem("department_id")
    this.presenceservice.getPresence(dep_id).subscribe(
      data => {
        this.presences = data
        console.log(data, "working")
      }
    );
  }

    // Get users
    getUsers() {
      this.usersService.getUsers(sessionStorage.getItem("department_id")).subscribe(data => {
        this.users = data;
      });
    }

    getUserName(user_id: number) {
      for (let i = 0; i < this.users.length; i++) {
        const element = this.users[i];
        if (element.id == user_id) {
          return element.full_name;
        }
      }
    }
}
