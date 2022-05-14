import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AuthService} from '../auth/shared/auth.service';
import {Users} from './mock-users'
import {Router} from '@angular/router';
import { AddUserPayload } from '../add-user/add-user.payload';
import { Subject } from 'rxjs';

declare const $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  
  users: Array<AddUserPayload> = [];
  dataTable: any;
  dtOptions: any;

  // dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('dTable', {static: true}) table;

  constructor(private userService: UserService, private authService: AuthService,
     private router: Router){}

  // ngAfterViewInit(): void {
  //   $(this.dataTable.nativeElement).DataTable(); 
  // }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2
    // };
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.dtOptions = {
        data: this.users,
        columns: [
          {title: 'User', data: 'username'},
          // {title: 'Email', data: 'email'},
          // {title: 'First Name', data: 'first_name'},
          // {title: 'Last Name', data: 'last_name'},
          // {title: 'Avatar', data: 'avatar'},
        ]
      };
    }, err => {}, () => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);
    });
  }
}
