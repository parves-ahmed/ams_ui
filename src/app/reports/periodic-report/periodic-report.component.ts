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

    $.fn.dataTable.ext.search.push(
      function (settings, data, dataIndex) {
        var dateFrom = parseInt($('#dateFrom').val(), 10);
        var dateTo = parseInt($('#dateTo').val(), 10);
        var searchDate = parseInt(data[4]) || 0; // use data for the age column

        if ((isNaN(dateFrom) && isNaN(dateTo)) ||
          (isNaN(dateFrom) && searchDate <= dateTo) ||
          (dateFrom <= searchDate && isNaN(dateTo)) ||
          (dateFrom <= searchDate && searchDate <= dateTo)) {
          return true;
        }
        return false;
      }
    );
    let table = $(this.dataTable.nativeElement).DataTable();

    $('#dateFrom, #dateTo').keyup(function () {
      table.draw();
    });
  }


  ngOnInit(): void {
  }

}
