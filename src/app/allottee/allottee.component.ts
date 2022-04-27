import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {AllotteeList} from './mock-allottee'

declare const $:any;

@Component({
  selector: 'app-allottee',
  templateUrl: './allottee.component.html',
  styleUrls: ['./allottee.component.css']
})
export class AllotteeComponent implements OnInit, AfterViewInit {

  allotteeList = AllotteeList
  @ViewChild("dTable", {static:false}) dataTable:any;
  constructor() { }

  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).DataTable();
  }

  ngOnInit(): void {
  }

}
