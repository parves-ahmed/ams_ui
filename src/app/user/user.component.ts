import {AfterViewInit, Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserPayload} from './user.payload';
import {UserService} from '../shared/user.service';
import {AuthService} from '../auth/shared/auth.service';
import {Users} from './mock-users'
import { Subject } from 'rxjs';
import {AddUserPayload} from '../add-user/add-user.payload';
import { Router } from '@angular/router';

declare const $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  users: Array<AddUserPayload> = [];
  user: AddUserPayload;
  // @ViewChild('dTable', {static: false}) dataTable: any;
  dtTrigger: Subject<any> = new Subject<any>();

  // ngAfterViewInit(): void {
  //   $(this.dataTable.nativeElement).DataTable();
  // }

  constructor(private userService: UserService, private authService: AuthService, private toastr: ToastrService,
     private router: Router){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(user => {
      this.users = user;
      console.log(this.users)
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  updateUser(id){
    this.router.navigateByUrl("/user/" + id)
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
