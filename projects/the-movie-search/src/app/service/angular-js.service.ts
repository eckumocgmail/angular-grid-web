import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AngularJsService {
  update = new EventEmitter();
  scope:         any = null;
  angularJsApp:         any = null;
  angularJsModule:      any = null;

  constructor(){ 
    if( !(<any>window)['angular'] ){
     throw new Error('angularjs must be import into project'); 
    }else{
      
      this.initAngularJsModule();
      this.bootstrapAngularJsModule();
    }   
  }

  resolveAngularJsApp( angularJsApp: any ){
        this.angularJsApp = angularJsApp;
        console.log( angularJsApp );
  }


  initAngularJsModule(){    
    const ctrl = this;
    const angular = (<any>window)['angular'];





 
    const app = 
    angular
    .module( 'angularJsApp',[/*'moduleOfCharts'*/] )

    .service('$mdb',function( $http: any ){

        const base_url = "http://api.themoviedb.org/3/"; 
        return function( api_key: any ){
            return {

                //запрос поиска по наименованию
                search( params: any, callback: any ){            
                    console.log( 'search: ', params );            
                    $http({
                        url:    (base_url+"search/movie"),
                        params:  params
                    }).then(function(resp: any){
                        console.log(resp.status);
                        callback(resp.data);
                    });                    
                },

                //запрос получения изображений кинофильма
                images( p: any, callback: any ){
                    //console.log( 'images: ', p );            
                    $http({
                        url:    (base_url+"movie/" + p.id + "/images"),
                        params:  p,
                    }).then(function(resp:any){
                        console.log(resp.status);
                        callback(resp.data);
                    });                                  
                }
            };
        }
    })  
    .service('$pagination', function $pagination( ){
            return function($scope: any){
                return {


                    //переход к заданной странице
                    setPage(page: any){

                        console.log('setPage: ',page);
                        if( 0>=page )page=1;
                        if( page>$scope.data.total_pages )page=$scope.data.total_pages;
                        if( page==$scope.data.page ){
                            console.log('current page: ',page);
                            return;
                        }
                        $scope.params = {
                            api_key: $scope.api_key,
                            query:   $scope.input,
                            page:    page
                        };
                        $scope.search( $scope.params, $scope.show );               
                    }        
                }
            }
        })
    .service('$debug',function(){
        return{

            checkCss(){

                console.log('$debug','linkedCss');
                const behavior = {};
                angular.forEach(document.styleSheets,function(styleSheet: any){
                    angular.forEach(styleSheet.cssRules,function(cssRule: any){

                        if( (<any>behavior)[cssRule.selectorText] ){
                            console.warn('css selector already defined: ',cssRule.selectorText);
                        }else{                   
                            (<any>behavior)[cssRule.selectorText]={};
                            for(let i=0; i<cssRule.style.length; i++){
                                (<any>behavior)[cssRule.selectorText][cssRule.style[i]]=cssRule.style[cssRule.style[i]];                             
                            }                     
                        }

                    });
                });
                console.log('behavior',behavior);

            }


        }
    })  
    .controller('jsAppCtrl', function(  $pagination: any, $mdb: any,$timeout: any,$scope: any ){        
        try{
            console.log('main app controller');
            console.log('MovieDatabaseCtrl');
            $scope.api_key="72b56103e43843412a992a8d64bf96e9"; 
            
            ctrl.scope=$scope;
            
            //content_view.addEventListener('scroll',function(evt){
            //    if( evt.target.scrollTop==evt.target.scrollTopMax ){
            //        evt.target.scrollTop=0;
            //        $scope.setPage($scope.data.page+1);
            //        $scope.$apply();            
            //    }
            //})
            $scope.input = 'love';
            $timeout(function(){
                $scope.update()
            },555);;

            angular.extend( $scope, new $mdb($scope.api_key) );
            angular.extend( $scope, {

                //получает данные из поискового запроса и закладывает в модель
                show( data: any ){
                    console.log('show: ','('+data.page+'/'+data+')',data);
                    $scope.set( data );
                    //todo: save into history need to use URL-parameters string
                },

                //устанавливает данные поискового запроса в модель и создает ссылки постраничной навигации 
                set( data: any ){         
                    for(let i=0;i<data.results.length; i++){
                        $scope.init( data.results[i] );
                    }
                    if( !$scope.pages || $scope.pages.length!=data.total_pages ){
                        console.log('reinit pages');
                        $scope.pages = [];
                        for( let x=1; x<=data.total_pages; x++ ){
                            $scope.pages.push(x);
                        }           
                    }
                    $scope.data = data;

                    //перемещение области просмотра на активный элемент управления
                    //$timeout(function(){                
                    //    const scrollPane = document.querySelector('#pagination_scroll');
                    //    const currentPageButton = document.querySelector('#b_page_'+data.page);      
                    //    const half = scrollPane.getBoundingClientRect().width/2;
                    //    $(scrollPane).animate({scrollLeft: currentPageButton.offsetLeft-half},333);
                    //},333);                       
                },

                //инициаллизация элемента области обозревателя
                init( p: any ){
                    p.load = new Set();
                },        

                //обработка событий нажатия клавиши на клавиатуре
                press(evt: any){  
                    console.log('pressed');
                    if( evt.originalEvent.code=="Enter" ){
                        $scope.update();
                    }
                },

                //обновление панели обозревателя
                update(){
                    console.log('update: ' );
                    if( $scope.input == '' ){
                        console.log('please input search query' );
                        return;
                    }
                    $scope.params = {
                        api_key: $scope.api_key,
                        query:   $scope.input
                    };
                    $scope.search( $scope.params, $scope.show );                

                }        
            });  


            //реализация постраничной навигации
            console.log(new $pagination($scope));
            angular.extend( $scope, new $pagination($scope), console);

            function next(){
                 try{
                     $timeout(function(){
                        console.log('next');
                         if( !$scope.movie.backdrops )
                             return;
                         $scope.movie.poster_path=$scope.movie.backdrops[$scope.movie.i++].file_path;

                         if( (!$scope.movie.active) || ($scope.movie.i == $scope.movie.backdrops.length) ){
                             $scope.movie.i = 0;
                         }else{
                             next();
                         }                            
                     },750);
                 }catch(e){
                     console.error(e);
                 }finally{
                     //$scope.$apply();
                 }
             }    
            $scope.showMovieDialog=function showMovieDialog(model: any,viewUrl: any){
                console.log('showMovieDialog',model);
                $scope.movie=model;

                /*$('.modal').modal('toggle');
                $('.modal').on('shown.bs.modal',function(){
                    console.log('show');
                    $scope.movie.started=true;
                    $scope.movie.api_key=$scope.api_key;
                    $scope.images( $scope.movie, function(resp){

                        console.log('get images',resp);
                        $scope.movie.i=0;
                        angular.extend( $scope.movie, resp );
                        $scope.movie.active=true;

                        $scope.movie.next==next;
                        $timeout(next,750);
                    },alert)
                });
                $('.modal').on('hide.bs.modal',function(){
                    if( $scope.movie.started && !$scope.movie.active){
                        setTimeout(function(){$scope.movie.active=false;},1000);
                    }else{
                        $scope.movie.active=false;
                    }
                });*/
            }    
        }catch(e: any)      {
            console.error(e);
            alert(e+'\n'+e.stack);
        }
    })
    // .directive('pane',function($compile,$interpolate){
    //     const params = {
    //         id:        'pane',
    //         scope:      true,
    //         transclude: true,
    //         bindToController:{
                
    //         },
    //         replace:    true,            
    //         template:   '<div ng-style="css">'+
    //                         '<div ng-hide="exceptions.length==0" class="error maxwidth h_pad" style="z-index: 1; ">'+
    //                         '  <div ng-repeat="exception in exceptions">'+
    //                         '   <h1>exception:</h1>'+
    //                         '   <h2 ng-bind="exception.source"></h2>'+
    //                         '   <h2 ng-bind="exception.message"></h2>'+
    //                         '   <p ng-bind="exception.stack"></p>'+
    //                         '  </div>'+
    //                         '</div>'+
    //                         '<div ng-hide="exceptions.length>0">'+                                                      
    //                             '<div ng-transclude ></div>'+
    //                         '</div>'+
    //                     '</div>',
    //         controller: controller,
    //         link: {
             
    //         }
    //     }

    //     const eventsModel=new $callStack({
    //         $postLink:  function $postLink(){},
    //         $doCheck:   function $doCheck(){},
    //         $onChanges: function $onChanges(){},
    //         $onInit:    function $onInit(){ },
    //         $onDestroy: function $onDestroy(){},
    //         $onUpdate:  function $onUpdate(){}
    //     });
         
    //     function $scopeExceptionCatcher( $scope,$element ){
    //         return function $catch(ex){
    //             ex.source = params.id;
    //             $scope.exceptions.push(ex);
    //         }
    //     }   
    //     function controller( $scope,$element,$attrs,$controller,$transclude ){
    //         const $runtimeEvents={
    //             $catcher: new $scopeExceptionCatcher( $scope,$element ),
    //             $event:   function( message ){
    //                 console.info( '['+message.status+']'+
    //                         '['+message.init_env+']'+'['+message.call_env+']'+
    //                         '['+message.type+']'+'['+message.time+']');
    //                 $scope.$emit(message.type);
    //                 if( $scope[message.type] ){
    //                     if( typeof($scope[message.type]) === 'function' ){
    //                         $scope[message.type](message);
    //                     }
    //                 }
    //                 let attrId = 'on'+message.type.substring(0,1).toUpperCase()+message.type.substring(1);
    //                 if( $attrs[attrId] ){     
    //                     $scope.$attrEval(attrId);
    //                 }                       
    //             }
    //         }
    //         try {
    //             const ctrl = angular.extend( this,{
    //                 $scope:     $scope,
    //                 $element:   $element,
    //                 $attrs:     $attrs,
    //                 $controller:$controller,
    //                 $transclude:$transclude
    //             });
                
    //             $scope.exceptions = [];
    //             $scope.$ctrl = ctrl;
    //             ctrl.__proto__ = $scope;
                
    //             this.$retranslatator = 
    //                 new $exceptionContext(
    //                     $runtimeEvents.$event,
    //                     $runtimeEvents.$catcher);
    //             this.$retranslatator.prototype.__proto__ = ctrl;   
    //             const ctrlEvents = angular.extend({},eventsModel);
    //             angular.extend(ctrlEvents,new componentBindingService(ctrl));         
    //             angular.extend(ctrlEvents,new emitEventsService(ctrl));         
    //             angular.extend(ctrlEvents,new $domBindingService(ctrl));  
    //             angular.extend( this, {
    //                 $postLink:  function $postLink(){   ctrlEvents.$postLink(); },
    //                 $doCheck:   function $doCheck(){    ctrlEvents.$doCheck(); },
    //                 $onChanges: function $onChanges(){  ctrlEvents.$onChanges(); },
    //                 $onInit:    function $onInit(){     ctrlEvents.$onInit();  },
    //                 $onDestroy: function $onDestroy(){  ctrlEvents.$onDestroy(); },
    //                 $onUpdate:  function $onUpdate(){   ctrlEvents.$onUpdate(); }                    
    //             });
 
                
    //         }catch(ex){                
    //             $runtimeEvents.$catcher(ex);                
    //         }
    //     }          
 
    //     function $mutationsControllerService( node,listener ){ 
    //         var MutationObserver =  window.MutationObserver ;
    //         var observer = new MutationObserver(listener);
    //         observer.observe(node, {
    //             attributes:     true, 
    //             childList:      true, 
    //             characterData:  true 
    //         });   
    //     };        
    //     function $findScopeOf( pnode, constructorName ){
    //         while( pnode!=Object.prototype ){
    //             if( constructorName==pnode.constructor.name ){
    //                 return pnode;
    //             }
    //             pnode=pnode.__proto__;
    //         }
    //         return null;
    //     };
    //     function $actionEvents( scopedElement ){
    //         const pnode = $findScopeOf( scopedElement,'HTMLElement' );
    //         var names = Object.getOwnPropertyNames( pnode );
    //         var arr = new Array();
    //         for ( var i=0; i<names.length; i++ ){                
    //             var name = names[i];
    //             if(  name.startsWith( 'on' )  ){
    //                 arr.push( names[i] );
    //             };
    //         };
    //         return arr;
    //     }
    //     function $domBindingService( ctrl ){
    //         //console.log('$domBindingService');
    //         let $scope = ctrl.$scope;
    //         let $element = ctrl.$element;
    //         let $attrs = ctrl.$attrs;  
            
    //         /** выполнение выражения определенного в атрибуте **/
    //         function $evaluateAttrExpression(attrId){
    //             //this.__proto__ = $scope;
    //             if( $attrs[attrId] )
    //                 return eval( $attrs[attrId]      );    
    //             else throw new Error('attribute '+attrId+' not defined');                
    //         }            
    //         $scope.$attrEval = ctrl.$retranslatator( $evaluateAttrExpression );
 
    //         /**
    //          * Триггер:
    //          * - вызова методов определенных в $scope
    //          * по событиям DOM из шаблона  
    //          * - компиляции выражения определенного а атрибуте on-{type}           
    //          */
    //         const $initHtmlEventListeners = ctrl.$retranslatator(
                    
                    
    //         function $initHtmlEventListeners(){
    //             ctrl.eventListeners={};
                
    //             angular.forEach( $actionEvents( $element[0] ), function( id ){  
                    
    //                 let type = id.substring( 2,id.length );
    //                 let attrId = 'on'+type.substring(0,1).toUpperCase()+type.substring(1);
    //                 function domEventDelegation( evt ){                
    //                     $scope.$emit(type);
    //                     if( $scope[type] ){
    //                         if( typeof($scope[type]) === 'function' ){
    //                             $scope[type]( evt );
    //                         }
    //                     }
    //                     if( $attrs[attrId] )
    //                         $scope.$attrEval(attrId);
    //                 }
    //                 ctrl.eventListeners[type]= domEventDelegation;
    //                 $element[0].addEventListener( type, domEventDelegation );
    //             });                
    //         });
    //         return { 
    //             $onInit:    function $onInit(){   
    //                 $scope.css={
    //                     boxSizing: 'border-box',
    //                     border: '1px solid black',
    //                     display: 'block',
    //                     width: '100%',
    //                     padding: '20px'
    //                 }
    //                 $element[0].id = 'p_'+$scope.$id;
                     
    //                 $initHtmlEventListeners();

    //                 //layout content
    //                 $element[0].addEventListener('resize',
    //                     ctrl.$retranslatator(layout ));
    //                 layout();
    //                 function layout(){
                        
    //                     //TODO: layout by attributes
    //                     /*console.log( 
    //                         $scope.$id,
    //                             $($element[0]).width(),
    //                             $($element[0]).height()
    //                     );  */            
    //                 };
                    
    //                 //
    //                 $mutationsControllerService($element[0],
    //                 ctrl.$retranslatator(function $mutationsHandler(){
    //                     angular.forEach(arguments,function(mutation){
    //                         switch(mutation.type){
    //                             case "attributes":      attributesChanged();    break;
    //                             case "childList":       childListChanged();     break;
    //                             case "characterData":   characterDataChanged();     break;
    //                         }
    //                     });
    //                 }));
    //                 function attributesChanged(){
                        
    //                 };
    //                 function childListChanged(){
    //                     //TODO:
    //                 };
    //                 function characterDataChanged(){
    //                     //TODO:
    //                 };
    //             }                             
    //         };
    //     }          
    //     function emitEventsService( ctrl ){
            
    //         //console.log('$controllerService');
    //         let $scope = ctrl.$scope;
    //         let $element = ctrl.$element;
    //         let $attrs = ctrl.$attrs;                                     
    //         return {
    //             $onChanges: function $onChanges(){  $scope.$emit('changes'); },
    //             $onInit:    function $onInit(){     $scope.$emit('init'); },
    //             $onDestroy: function $onDestroy(){  $scope.$emit('destroy'); },
    //             $onUpdate:  function $onUpdate(){   $scope.$emit('update'); },               
    //         };
    //     }   
    //     function componentBindingService( ctrl ){
            
    //         console.log('$controllerService');
    //         let $scope = ctrl.$scope;
    //         let $element = ctrl.$element;
    //         let $attrs = ctrl.$attrs;    
    //         let $transclude = ctrl.$transclude;
    //         return {
    //             $onInit:    function $onInit(){    
    //                 $scope.contentViews=["listView","treeView","tableView","gridView"]
    //                 $scope.contentView = "tableView";                 
    //             },
    //             $postLink:  function $postLink(){
    //                 $scope.$watch( function $changeListener(){
    //                     //console.log(new Date().getMilliseconds(), $scope.contentView);
    //                 } );
    //             }
    //         };
    //     }          
    //     return params;
    // })
    
    
    

    //клиент доступа к данным сервиса поиска кинофильмов
    //рабочие запросы
    //theMovieDb.jobs.getList(console.log,alert)



    function $extend( target, proto ){
    let p = target;
    switch( typeof(target) ){
        default:{
            if( target.constructor && target.constructor.prototype ){
               while( p.__proto__ && !Object.is( p.__proto__,target.constructor.prototype ) ){
                  p = p.__proto__;
               };
            }
            p.__proto__ = proto;               
            break;
        }
    }
    return target;
};  


 

  }
    

  bootstrapAngularJsModule(){
    
    (<any>window)['angular'].bootstrap( document.body, ['angularJsApp'] );
  }

}


