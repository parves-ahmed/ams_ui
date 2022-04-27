import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {DateWiseReportData} from './mock-dateWiseReport'

declare const $: any;

@Component({
  selector: 'app-date-wise-report',
  templateUrl: './date-wise-report.component.html',
  styleUrls: ['./date-wise-report.component.css']
})

export class DateWiseReportComponent implements OnInit, AfterViewInit {

  dataList = DateWiseReportData;
  @ViewChild("dTable", {static:false}) dataTable: any;

  constructor() { }
  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).DataTable();
  }

  ngOnInit(): void {
  }

}
