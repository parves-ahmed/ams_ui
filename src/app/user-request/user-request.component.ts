import { Component, OnInit } from '@angular/core';
import {UserRequestPayload} from './user-request.payload';
import { Subject } from 'rxjs';
import {UserRequestService} from './user-request.service'
import { AuthService } from '../auth/shared/auth.service';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  userRequests: Array<UserRequestPayload> = [];
  updatedRequest: UserRequestPayload;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private userRequestService: UserRequestService, private authService: AuthService,
     private toastr: ToastrService, private router: Router) {
    this.updatedRequest = {
      requestedUserName : "",
      requestStatus: "",
    }
   }

  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      this.userRequestService.getAllUserRequests().subscribe(userRequest => {
      this.userRequests = userRequest;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
    }
    
  }

  approveRequest(row){
    this.updatedRequest.requestedUserName = row.requestedUserName;
    this.updatedRequest.requestStatus = 'approved';
    this.userRequestService.updatedStatus(this.updatedRequest).subscribe(()=>{
      this.toastr.success("Request updated successfully");  
      location.reload();
    },()=>{
      this.toastr.error("Request update failed")
    })
  }

  rejectRequest(row){
    this.updatedRequest.requestedUserName = row.requestedUserName;
    this.updatedRequest.requestStatus = 'rejected';
    this.userRequestService.updatedStatus(this.updatedRequest).subscribe(()=>{
      this.toastr.success("Request updated successfully");
    },()=>{
      this.toastr.error("Request update failed")
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
