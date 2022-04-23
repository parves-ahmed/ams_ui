import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationPayload} from './application.payload';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ApplicationService} from '../shared/application.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/shared/auth.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  applications: Array<ApplicationPayload> = [];
  applicationForm: FormGroup;
  application: ApplicationPayload;

  constructor(private applicationService: ApplicationService, private authService: AuthService, private router: Router, private toaster: ToastrService, private modalService: NgbModal,
              private config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.application = {
      id: 0,
      reqfund: 0,
      appfund: 0,
      yearlyIncome: 0,
      officeName: '',
      officeAddress: '',
      designation: '',
      actionCount: 0,
      stageActorId: 0,
      stageActorDetails: '',
      applicantId: 0,
      applicantDetails: ''
    };
  }

  ngOnInit(): void {
    // get all stages list from server
    this.applicationService.getAllApplications().subscribe(applications => {
      this.applications = applications;
    });
    this.applicationForm = new FormGroup({
      reqfund: new FormControl('', Validators.required),
      yearlyIncome: new FormControl('', Validators.required),
      officeName: new FormControl('', Validators.required),
      designation: new FormControl(''),
      officeAddress: new FormControl('')
    });
  }

  // tslint:disable-next-line:typedef
  create() {
    this.application.reqfund = this.applicationForm.get('reqfund').value;
    this.application.yearlyIncome = this.applicationForm.get('yearlyIncome').value;
    this.application.officeAddress = this.applicationForm.get('officeAddress').value;
    this.application.officeName = this.applicationForm.get('officeName').value;
    this.application.designation = this.applicationForm.get('designation').value;
    // this.applicationService.create(this.application).subscribe(() => {
    //   this.toaster.success('Application Created Successful');
    //   window.location.reload();
    // }, () => {
    //   this.toaster.error('Error in Application Creation');
    // });
  }

  // tslint:disable-next-line:typedef
  action(id, index) {
    this.router.navigate(['/stage-action'], {queryParams: {application: id}});
  }

  // modal action open
  // tslint:disable-next-line:typedef
  open(content) {
    if (this.authService.getRole() === 'USER') {
      this.modalService.open(content, {centered: true});
    } else {
      this.toaster.error('Only users are allowed to create Application');
    }
  }

  // modal action close
  // tslint:disable-next-line:typedef
  onClose(modal) {
    modal.close();
  }
}
