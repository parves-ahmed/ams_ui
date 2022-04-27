import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {PeriodicReportData} from './mock-periodicReport';

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
    $(this.dataTable.nativeElement).DataTable();

    // $('#btnSearch').click(function () {
    //    table.draw();
    // });
  }


  ngOnInit(): void {
  }

  search(){
    
    console.log('find');
    $.fn.dataTable.ext.search.push(
      function (settings, data, dataIndex) {
        let dateFrom = $('#dateFrom').val();
        dateFrom = new Date(dateFrom);
        let dateTo = $('#dateTo').val();
        dateTo = new Date(dateTo);
        var dateDiff = data[4];
        dateDiff = new Date(dateDiff);
        console.log('df'+ dateFrom, 'dt' + dateTo, 'dff' + dateDiff)
        if ((isNaN(dateFrom) && isNaN(dateTo)) ||
          (isNaN(dateFrom) && dateDiff <= dateTo) ||
          (dateFrom <= dateDiff && isNaN(dateTo)) ||
          (dateFrom <= dateDiff && dateDiff <= dateTo)) {
          return true;
        }
        return false;
      }
    )
    let table = $(this.dataTable.nativeElement).DataTable();
    table.draw();
   }  
   
  
}
