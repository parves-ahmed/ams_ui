import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {PeriodicReportData} from './mock-periodicReport';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

declare const $:any;

@Component({
  selector: 'app-periodic-report',
  templateUrl: './periodic-report.component.html',
  styleUrls: ['./periodic-report.component.css']
})
export class PeriodicReportComponent implements OnInit, AfterViewInit {

  dataList = PeriodicReportData;
  @ViewChild("dTable", {static:false}) dataTable: any;
  model;
  constructor() { }

  ngAfterViewInit(): void {

    // $.fn.dataTable.ext.search.push(
    //   function (settings, data, dataIndex) {

      
    //     var dateFrom = $('#dateFrom').val();
    //     var dateTo = $('#dateTo').val();
    //     // use data for the age column

       
    //     return false;
    //   }
    // );
    let table = $(this.dataTable.nativeElement).DataTable();

    $('#btnSearch').click(function () {
       table.draw();
    });
  }


  ngOnInit(): void {
  }



}
