import { AfterContentInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RootService } from './root.service';
import { ValidationService } from './validation.service';

 @Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit, AfterContentInit{
  

  cursor: 'col-resize'|'pointer' = 'pointer';
  ready = false;
  message = '';
  focusedRow = -1;
  focusedRowsIndexes = [];
  selectedRows = [];
  selectedRow = -1;
  selectedColumns = [];
  selectionMode: 'cols'|'rows'|'cells' = 'rows';
  navbarBrand = 'eckumoc@gmail.com';
  navbarMenuitems: Array<{label: string, onclick: ()=>void, isEnabled: ()=>boolean }>=[
    //{label: 'авторизация',      enabled: true, onclick: ()=>{ this.resetConfiguration(); }},
    //{label: 'регистрация',      enabled: true, onclick: ()=>{ this.resetConfiguration(); }},
    {label: 'сброс',      isEnabled: ()=>{ return true; }, onclick: ()=>{ this.resetConfiguration(); }},
    {label: 'добавить',   isEnabled: ()=>{ return true; }, onclick: ()=>{ this.addRecord(); }},
    {label: 'удалить',    isEnabled: ()=>{ return this.selectedRows.length>0; }, onclick: ()=>{ this.removeRecord(); }},        
  ];
  searchQuery = '';
  searchOptions = [];  
  searchResults: Array<{
      poster_path: string, 
      title: string,
      overview: string,
      release_date: string,
  }>=[{ overview: 'Customization data grid provide you a easy way to consifure dynamic contents css options.', poster_path: '', title: 'Customization data grid', release_date: '11.04.2022'}];   
  inputModel = {
    name: '',
    surname: '',
    email: '',
    phone: ''
  };
  inputErrors = {
    name: [],
    surname: [],
    email: [],
    phone: []
  };
  
  isValide(){
    if(this.inputErrors.name.length>0)
      return false;
    if(this.inputErrors.surname.length>0)
      return false;
    if(this.inputErrors.email.length>0)
      return false;
    if(this.inputErrors.phone.length>0)
      return false;
    return true;
  }

  validate(){
    
    this.inputErrors.name = [];
    this.inputErrors.surname = [];
    this.inputErrors.email = [];
    this.inputErrors.phone = [];
    
    
    if(!this.inputModel.name){
      this.inputErrors.name.push('Введите имя');
    }else{
      if(!this.validation.isRusText(this.inputModel.name)){
        this.inputErrors.name.push('Используйте русский алфавит для имени');
      }
      if(this.inputModel.name.length>=255){
        this.inputErrors.name.push('Слишком длинное значение должноб не превышать 255 символов');
      }
    }
    if(!this.inputModel.surname){
      this.inputErrors.surname.push('Введите фамилию');
    }else{
      if(!this.validation.isRusText(this.inputModel.surname)){
        this.inputErrors.surname.push('Используйте русский алфавит для фамилии');
      }
      if(this.inputModel.surname.length>=255){
        this.inputErrors.surname.push('Слишком длинное значение должноб не превышать 255 символов');
      }
    }
    
    if(this.validation.isEmail(this.inputModel.email)==false){
      this.inputErrors.email.push('Адрес не корректный');
    }
    if(this.validation.isPhoneNumber(this.inputModel.phone)==false){
      this.inputErrors.phone.push('Номер нужно указать в формате +78123495696');
    }
  }

  getWidthes(){
    try{
      return this.tableModel.tableColumns.map(col=>col.RelativeWidth);
    }catch(e){
      return [];
    }
  }
  
  constructor(public element: ElementRef, public app: RootService, private validation: ValidationService) {
    window['page'] = this;
    this.validate();
  }

  getTableWidth(){
    return document.getElementById('tableElement').getBoundingClientRect().width;
  }

  ngAfterContentInit(): void {
    setTimeout(()=>{
      this.onResize(null);
    },1000);
  }

  getHtmlElement(): HTMLElement{
    return (this.element.nativeElement as HTMLElement);
  }

  getCss( p: Element|string ){
    if( p instanceof Element == false )
      p = document.querySelector(p.toString());
    return window.getComputedStyle(p as Element);
  }

  getComputedStyle(): any{
    return window.getComputedStyle(this.getHtmlElement());
  }

  getComputedWidth(): any{
    return this.getComputedStyle().width;
  }

  select(query: string){
    return document.querySelectorAll(query);
  }

  selectFirst(query: string){
    return document.querySelector(query);
  }

  tableWidth: number = -1;
  onResize(evt: Event){
    const ptableElement = document.getElementById('tableElement');
    this.tableWidth = ptableElement? ptableElement.getBoundingClientRect().width: -1;
  }


  onInput($event:any){
    this.inputModel[$event.target['name']] = $event.target.value;
    this.validate();
  }

  public ngOnInit(): void {       
    this.gridView = this.gridData;
    const ctrl = this;
    this.onResize(null);
    window.addEventListener('resize', (evt)=>{ this.onResize(evt); }, true);
    window.addEventListener('keydown',function(evt: KeyboardEvent){
      //console.info(evt.code);
      if( evt.code=='ControlLeft' ){

        ctrl.setColsSelectionMode();
        const remove = function(){
          ctrl.selectionMode = 'rows';
          window.removeEventListener('keyup',remove,true);
        }
        window.addEventListener('keyup',remove,true);
      }
      

    },true);

    
     
    this.resetConfiguration();
    //this.state = JSON.stringify(this.tableModel.tableColumns.map(col=>col.RelativeWidth));
    this.ready = true;
  }

  removeRecord() {
    this.selectedRows.sort((x1,x2)=>x2-x1);
    while(this.selectedRows.length>0){
      const index = this.selectedRows.shift();
      if(this.gridData.length>1){
        this.gridData.splice(index,1);
      }else{
        this.gridData.shift();
      }
    }
  }

  recordIndex: number = -1;
  editDialog(index: number){
    delete this.inputModel;
    this.recordIndex = index;
    this.inputModel = this.gridData[index];
    document.getElementById('showModalButton').click();
    this.validate();
  }

  closeModal(){
    document.getElementById('cancelButton').click();
  }

  
  onSaveClicked(){
    this.closeModal();
    if(this.recordIndex==-1){
      this.gridData.push(this.inputModel);
      this.gridView = this.gridData;
      this.inputModel = {
        name: '',
        surname: '',
        email: '',
        phone: ''
      };
      this.validate();
    }
    else{
      this.gridData[this.recordIndex].name = this.inputModel.name;
      this.gridData[this.recordIndex].surname = this.inputModel.surname;
      this.gridData[this.recordIndex].email = this.inputModel.email;
      this.gridData[this.recordIndex].phone = this.inputModel.phone;
    }

    
    return true;
  }

  setupConfiguration() {
    throw new Error('Method not implemented.');
  }
  addRecord() {
    try{
      this.recordIndex = -1;
      document.getElementById('showModalButton').click();
    }catch(e){
      alert(e);
    }
  }

  isRowHighlight(rowIndex: number){
    return (this.isSelectingRows() && rowIndex==this.focusedRow) && rowIndex!=-1;
  }

  isColHighlight(colIndex: number){
    return ( colIndex==this.focusedColumn);
  }

  mouseAtLeftBorder = false;
  mouseAtRightBorder = false;
  resizeColumnEnabled = false;

  onMouseDown( evt ){
    if( this.selectionMode == 'cols'){
      if(this.mouseAtLeftBorder || this.mouseAtRightBorder){
        this.resizeColumnEnabled = true;
      }
    }
  }
  onMouseUp( evt ){
    if( this.selectionMode == 'cols'){
      if(this.mouseAtLeftBorder || this.mouseAtRightBorder){
        this.resizeColumnEnabled = false;
      }
    }
  }
  lastMousePosition = null;
  onMouseMoved( evt, tableColumn: { RelativeWidth: number } ){
    const rect = evt.target.getBoundingClientRect();
    if( this.selectionMode=='cols' ){
      if(evt.clientX<(rect.x + 30)){
        this.cursor = 'col-resize';
        this.mouseAtLeftBorder = true;
      }else{
        this.mouseAtLeftBorder = false;
        if( evt.clientX>(rect.x+rect.width-30) ){
          this.mouseAtRightBorder = true;
          this.cursor = 'col-resize';        
        }else{
          this.mouseAtRightBorder = false;
          this.cursor = 'pointer';
        }
      }
      if(this.resizeColumnEnabled){      
      
        if(!this.lastMousePosition){
          this.lastMousePosition = {
            x: evt.target.getBoundingClientRect().x,
            y: evt.target.getBoundingClientRect().y
          };
        }
        //this.lastMousePosition = {x: evt.clientX, y: evt.clientY};
        
  
        if(this.mouseAtLeftBorder){
        
          const prevColumn = this.tableModel.tableColumns[this.focusedColumn-1];          
          const devX = this.$relative('tableElement', prevColumn.RelativeWidth+1)-this.$relative('tableElement', prevColumn.RelativeWidth);
          if(evt.clientX>(evt.target.getBoundingClientRect().x+devX)){
            prevColumn.RelativeWidth++;
            this.saveConfiguration();
          }
  
        }else if(this.mouseAtRightBorder){
          const currentColumn = this.tableModel.tableColumns[this.focusedColumn]; 
          const devX = this.$relative('tableElement',currentColumn.RelativeWidth)-this.$relative('tableElement',currentColumn.RelativeWidth-1);

          if(evt.clientX<(evt.target.getBoundingClientRect().x+evt.target.getBoundingClientRect().width-devX)){
            currentColumn.RelativeWidth--;
            this.saveConfiguration();
          }          
        }
        
      }
    }
    
    
    //console.info(this.cursor, evt.clientX, evt.clientY);
  }




  selectedColumn: number = -1;
  onClicked( evt: Event, rowNumber: number, columnNumber: number ){   
    if( this.selectionMode == 'rows' ){
      if(this.selectedRows.indexOf(rowNumber)==-1){
        this.selectedRows.push(rowNumber);
      }else{
        if(this.selectedRows.length==1){
          this.selectedRows.shift();
        }else{
          this.selectedRows.splice(this.selectedRows.indexOf(rowNumber),1);
        }
      }
    }else{
      this.selectedColumn = columnNumber;
    }
     
  }
  setLessWidthForSelectedColumnClicked(){
    this.tableModel.tableColumns[this.selectedColumn].RelativeWidth-=1;
  }
  setMoreWidthForSelectedColumnClicked(){
    this.tableModel.tableColumns[this.selectedColumn].RelativeWidth+=1;
  }


  /** УПРАВЛЕНИЕ ПРЕДСТАВЛЕНИЕМ */
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


  
  
  public gridData: any[] =[];
  public gridView: any[] = [];
  public focusedColumn = 0;
  public mySelection: string[] = [];

  $relative(idElement: string,relativeWidth: number){
 
    let summaOfRelativeWidth = 0;
    for(let i=0; i<this.tableModel.tableColumns.length; i++){
      summaOfRelativeWidth += this.tableModel.tableColumns[i].RelativeWidth;
    }
    try{
      let absTableWidth =  document.getElementById(idElement).getBoundingClientRect().width;
      let absColumnWidth = relativeWidth*(absTableWidth/summaOfRelativeWidth);
      return absColumnWidth;        
    }catch(e){
      alert(e);
    }
  }

  getAbsWidth( id ){
    return this.getCss( id ).width;
  }


  setColsSelectionMode() {
    this.selectionMode = 'cols';    
  }

  onSearchInput(evt: any){
  }

  onSearchResult(evt: any){
  }
  
  resetConfiguration(){
    const ctrl = this;
    this.tableModel = {
      tableColumns: [
        { elementid: '1', RusTitle:     'name',     RelativeWidth: 10, BindProperty: 'name' },
        { elementid: '2', RusTitle:     'surname',  RelativeWidth: 30, BindProperty: 'surname' },
        { elementid: '3', RusTitle:     'email',    RelativeWidth: 30, BindProperty: 'email' },
        { elementid: '4', RusTitle:     'phone',    RelativeWidth: 30, BindProperty: 'phone' },
      ]
    };
    this.saveConfiguration();
    this.app.getRemote(data=>{
      this.gridData=data.users;
      this.saveConfiguration();
      return this.gridData;
    });
    
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
  


  isSelectingRows(){ return this.selectionMode=='rows'; }
  isSelectingCols(){ return this.selectionMode=='cols'; }
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