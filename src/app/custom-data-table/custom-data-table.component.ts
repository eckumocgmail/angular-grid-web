import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { employees } from "./employees";
import { images } from "./images";

@Component({
  selector: 'app-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styles: [
    `
      .customer-photo {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: 32px 35px;
        background-position: center center;
        vertical-align: middle;
        line-height: 32px;
        box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0, 0, 0, 0.2);
        margin-left: 5px;
      }

      .customer-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 32px;
        padding-left: 10px;
      }

      .red {
        color: #d9534f;
      }

      .text-bold {
        font-weight: 600;
      }
    `,
  ]
})
export class CustomDataTableComponent implements OnInit {

 
  ready = false;
  message = '';

  public tableModel: 
  {
    tableColumns: Array<any|{
      ID: string,
      RusTitle:       string, 
      RelativeWidth:  number,
      BindProperty:   string
    }>
  } = {
    tableColumns:[      
    ]
  }; 
  
  public gridData: any[] = employees;
  public gridView: any[] = [];

  public mySelection: string[] = [];

  $relative(relativeWidth: number){
    console.info(this.tableElement);
    let summaOfRelativeWidth = 0;
    for(let i=0; i<this.tableModel.tableColumns.length; i++){
      summaOfRelativeWidth += this.tableModel.tableColumns[i].RelativeWidth;
    }
    let absTableWidth = getComputedStyle(this.tableElement.nativeElement).width;
    let absColumnWidth = relativeWidth*(parseFloat(absTableWidth)/summaOfRelativeWidth);
    return absColumnWidth;
  }
  constructor(public tableElement: ElementRef) {}

  /**
    employee data record
    {
      id: "7ecfb74e-64d9-43ee-a028-d2e3841acba9",
      full_name: "Bret Barnsdall",
      job_title: "Registered Nurse",
      country: "BR",
      is_online: true,
      rating: 3,
      target: 52,
      budget: 55153,
      phone: "(222) 2089814",
      address: "4 Corry Park",
      img_id: 8,
      gender: "M",
    },
   
   */
  public ngOnInit(): void {
    

    this.gridView = this.gridData;
    const key = location.href.toString();
    const json = localStorage.getItem(key)
    if( !json || json?.length==0 ){
      this.tableModel = {
        tableColumns: [
          { elementid: '1', RusTitle:     '№',    RelativeWidth: 10, BindProperty: 'full_name' },
          { elementid: '2', RusTitle:     'Name', RelativeWidth: 35, BindProperty: 'job_title' },
          { elementid: '3', RusTitle:     'Desc', RelativeWidth: 55, BindProperty: 'address' },
        ]
      };
    }else{
      this.tableModel = JSON.parse(json);
    }

    this.state = JSON.stringify(this.tableModel.tableColumns.map(col=>col.RelativeWidth));
    this.ready = true;
  }


  resetConfiguration(){
    this.tableModel = {
      tableColumns: [
        { elementid: '1', RusTitle:     '№',    RelativeWidth: 10, BindProperty: 'full_name' },
        { elementid: '2', RusTitle:     'Name', RelativeWidth: 35, BindProperty: 'job_title' },
        { elementid: '3', RusTitle:     'Desc', RelativeWidth: 55, BindProperty: 'address' },
      ]
    };
    this.saveConfiguration();

    console.info('configuration saved success');
  }


  loadFirstState(){
    this.tableModel.tableColumns[1].RelativeWidth = 10;
  }
  loadSecondState(){
    this.tableModel.tableColumns[2].RelativeWidth = 10;
  }
  loadThirdState(){
    this.tableModel.tableColumns[0].RelativeWidth = 1000;
    this.tableModel.tableColumns[1].RelativeWidth = 1000;
    this.tableModel.tableColumns[2].RelativeWidth = 1000;
  }
  selectionMode: 'cols'|'rows'|'cells';

  onTableKeyUp(evt: KeyboardEvent ){
    if( evt.ctrlKey )
    {
      this.selectionMode = 'rows';
    }
  }
  onTableKeyDown(evt: KeyboardEvent ){
    if( evt.ctrlKey )
    {
      this.selectionMode = 'cols';
    }
  }

  state: string = '';

  saveConfiguration(){
    const key = location.href.toString();
    localStorage.setItem(key, JSON.stringify(this.tableModel) );
    console.info('stored success');
  }

  process(model, params){
    return {
      data: []
    };
  }


  public onFilter(inputValue: string): void {
    this.gridView = this.process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "full_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "job_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "budget",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phone",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "address",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;    
  }

}