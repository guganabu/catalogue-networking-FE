import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users = [];

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.loadUsers();
  }

  //Method to load users in system
  loadUsers() {
    return this.userService.fetchUsers().subscribe((users: Array<any>) => {
      console.log('users', users);
      this.users = users;
    })
  }

}
