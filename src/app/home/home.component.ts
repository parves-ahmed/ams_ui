import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/shared/auth.service';
import {Router} from '@angular/router';
import {HomeServiceService} from '../home/home-service.service';
import {ToastrService} from 'ngx-toastr';
import {RequestAuthorityPayload} from './request-authority.payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  requestAuthorityPayload: RequestAuthorityPayload; 
  requestPanel: boolean = true;
  waitingPanel: boolean = false;
  constructor(private router: Router, private homeService: HomeServiceService, private toastr: ToastrService) {
    this.requestAuthorityPayload = {
      requestStatus: ''
    }
  }

  ngOnInit(): void {
      this.getRequestStatus();
  }

  sendRequest(){
    console.log("send Request");
    this.requestAuthorityPayload.requestStatus = 'requested';
    this.homeService.sendRequesrForAuthority(this.requestAuthorityPayload).subscribe(()=>{
      this.requestPanel = false;
      this.waitingPanel = true;
      this.toastr.success("Request send Successfully");
    },()=>{
      this.toastr.error('Request failed')
    })
  }

  getRequestStatus(){
    this.homeService.getRequestStatus().subscribe((getRequestStatus)=>{
      this.requestAuthorityPayload = getRequestStatus;
      console.log(this.requestAuthorityPayload.requestStatus);
      if(this.requestAuthorityPayload.requestStatus === 'requested'){
        console.log("ok")
        this.requestPanel = false;
        this.waitingPanel = true;
      }
    },()=>{
      console.log('Request failed')
    })
  }

}
