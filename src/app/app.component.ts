import { Component, OnInit } from '@angular/core';
import { ServicePageService } from './Services/service-page.service';

declare var $: any;
// import Highcharts = require('highcharts');
 import * as Highcharts from 'highcharts';
 import highcharts3D from 'highcharts/highcharts-3d';
 highcharts3D(Highcharts)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'NewDropDown';
  Highcharts = Highcharts;

  constructor(private _service:ServicePageService) { }
  ngOnInit() {
    this.ZoneBinding();

  }
  dropZone:any;dropCircle:any;dropdivision:any;dropsubdivision:any; dropSubStationsObj:any;piedata:any;
  async ZoneBinding(){
    var userid = 1;
      var ZoneObj = { UserID:userid, Type: 0 }
      try {
        const response =await this._service.ZoneService(ZoneObj).toPromise();
        this.dropZone = response;
        $("#zoneid").empty();
        if (this.dropZone.length > 0) {
          for (var i = 0; i < this.dropZone.length; i++) {
            $("#zoneid").append($("<option> </option>").val(this.dropZone[i].ZoneID).html(this.dropZone[i].Zone));
          }}
          this.CircleBinding();
      } catch(error) {
        console.error(error);
      }

    //   // this._service.ZoneService(ZoneObj).subscribe((dt:any) => {
    //   //   this.dropZone = dt;
    //   //  console.log(this.dropZone)
    //   //  this.CircleBinding();
    //   // })

    // // const source$ = interval().pipe(take(5));
    // // const finalNumber = await lastValueFrom(source$);
    // // setInterval(() => {
    // //   this.CircleBinding()
    // //   }, 1000);


  }
  async CircleBinding(){
    debugger;
       try {
        var userid = 1;
        var id= $("#zoneid").val();
        var Zoneid : number = +id
         var CircleObj = { UserID:userid, Type: 0, ZoneID: Zoneid}
        const response = await this._service.CircleService(CircleObj).toPromise();
        this.dropCircle = response;
        $("#circleid").empty();
        if (this.dropCircle.length > 0) {
          for (var i = 0; i < this.dropCircle.length; i++) {
            $("#circleid").append($("<option> </option>").val(this.dropCircle[i].CircleID).html(this.dropCircle[i].Circle));
          }}
          this.DivisionBinding();
      } catch(error) {
        console.error(error);
      }
}

async DivisionBinding(){

  try {
    var userid = 1;
    var id= $("#circleid").val();
    var circleid : number = +id
     var DivisionObj = { UserID:userid, Type: 0, CircleID: circleid}
    const response = await this._service.DivisionService(DivisionObj).toPromise();
    this.dropdivision = response;
    $("#divisionid").empty();
    if (this.dropdivision.length > 0) {
      for (var i = 0; i < this.dropdivision.length; i++) {
        $("#divisionid").append($("<option> </option>").val(this.dropdivision[i].DivisionID).html(this.dropdivision[i].Division));
      }}
      this.SubDivisionBinding()
  } catch(error) {
    console.error(error);
  }
}
async SubDivisionBinding(){

  try {
    var userid = 1;
    var id= $("#divisionid").val();
    var divisionid : number = +id
     var SubDivisionObj = { UserID:userid, Type: 0, DivisionID: divisionid}
    const response = await this._service.SubDivisionService(SubDivisionObj).toPromise();
    this.dropsubdivision = response;
    $("#subdivisionid").empty();
    if (this.dropsubdivision.length > 0) {
      for (var i = 0; i < this.dropsubdivision.length; i++) {
        $("#subdivisionid").append($("<option> </option>").val(this.dropsubdivision[i].SubDivisionID).html(this.dropsubdivision[i].SubDivision));
      }}
      this.SubStationsBinding();
  } catch(error) {
    console.error(error);
  }
}


async SubStationsBinding(){

  try {
    var userid = 1;
    var id= $("#subdivisionid").val();
    var subdivisionid : number = +id
     var SubStationsObj = { UserID:userid, Type: 0, SubDivisionID: subdivisionid}
    const response = await this._service.SubStationsService(SubStationsObj).toPromise();
    this.dropSubStationsObj = response;
    $("#subStationsid").empty();
    if (this.dropSubStationsObj.length > 0) {
      for (var i = 0; i < this.dropSubStationsObj.length; i++) {
        $("#subStationsid").append($("<option> </option>").val(this.dropSubStationsObj[i].SubStationID).html(this.dropSubStationsObj[i].SubStation));
      }}

  } catch(error) {
    console.error(error);
  }
  this.PiechartDetails();
};

// public C_Com:any;
// public C_NotCom:any;
// public C_NotCommiss:any;
options:any;

async PiechartDetails(){
  debugger;
  try{
    var userid = 1;
    var Zoneid : number = +$("#zoneid").val();
    var circleid : number = +$("#circleid").val();
    var divisionid : number = +$("#divisionid").val();
    var subdivisionid : number = +$("#subdivisionid").val();
    var subStationsid : number = +$("#subStationsid").val();

    var PiechartObj = { UserID:userid, Type: 0, ZoneID:Zoneid, CircleID:circleid, DivisionID:divisionid, SubDivisionID:subdivisionid,SubStationID:subStationsid}

    const response = await this._service.PiechartService(PiechartObj).toPromise();
    this.piedata = response;
    console.log(this.piedata)
    var myFunction=(option:any, chart:any)=> {
      debugger;
     // this.router.navigate(['/installationstatus'], {queryParams:{title: options.name, type:chart}})
     alert(option.name)
   }


   var karthik = (kar:any)=>{
    debugger
        return   kar.key + ':' + '<b>' + kar.y + '</b>'
   }
        if(this.piedata.length > 0 ){
        debugger;
          for(var i = 0; i < this.piedata.length; i++ ){
              if(this.piedata[i].Network ==="Cellular" ){
                var C_Com = this.piedata[i].Communicated;
                var C_NotCom = this.piedata[i].NotCommunicated;
                var C_NotCommiss= this.piedata[i].NotCommissioned;
                var cellular_status =  [{ name: 'Communicated', y: C_Com, color: '#9acd32' },
                      { name: 'Not Communicated', y: C_NotCom, color: '#f08080' },
                      { name: 'Not Commissioned', y: C_NotCommiss, color: '#f9e05b' }]

                this.options = {
                  chart : {
                   type:'pie',
                   options3d: {
                      enabled: true,
                      alpha: 45,
                      beta: 0
                   },
                   backgroundColor: 'transparent',
                     plotBorderWidth: null,
                     plotShadow: false,
                     displayErrors: false
                  },
                  title : {
                     text: ''
                  },
                  tooltip : {
                    formatter:function() {
                      debugger;
                      var kar = this;
                    return karthik(kar);
                  }

                  },

                  plotOptions : {
                     pie: {
                        cursor: 'pointer',
                        depth: 70,
                        dataLabels: {
                           enabled: true,
                           format: '{point.y}',

                        },
                        point: {
                          events: {
                            click: function () {
                         debugger;
                              var option = this
                               var chart = "cellularcontainer"
                               myFunction(option, chart);
                             }
                       }
                      }
                     }
                  },
                  series : [{
                     data: cellular_status
                  }]
               };

              }else if(this.piedata[i].Network ==="LPR"){
                var L_Com = this.piedata[i].Communicated;
                var L_NotCom = this.piedata[i].NotCommunicated;
                var  L_NotCommiss= this.piedata[i].NotCommissioned;
                var lpr_status = [{ name: 'Communicating', y: L_Com, color: '#9acd32' },
                { name: 'Not Communicating', y: L_NotCom, color: '#f08080' },
                { name: 'Not Commissioned', y: L_NotCommiss, color: '#f9e05b' }]
              }
          }


        }


  } catch(error){


  }

}
zoneChange(){
  debugger;
  this.CircleBinding();

  this.PiechartDetails();
}
circleChange(event:any){
  this.DivisionBinding();
  this.PiechartDetails();
}
divisionChange(event:any){
  this.SubDivisionBinding();
  this.PiechartDetails();
}
subdivisionChange(event:any){
this.SubStationsBinding();
this.PiechartDetails();
}
substationChange(event:any){
  this.PiechartDetails();
}



}