import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicePageService {

  constructor(private _http:HttpClient) { }

  ZoneService(ZoneObj:any){
    return this._http.post("https://hes.visiontek.co.in:8005/api/GetDBZones", ZoneObj)
          }
   CircleService(CircleObj:any){
            return this._http.post("https://hes.visiontek.co.in:8005/api/GetDBCircles", CircleObj)
          }      
    DivisionService(DivisionObj:any){
      return this._http.post("https://hes.visiontek.co.in:8005/api/GetDBDivisions", DivisionObj)
    }
    SubDivisionService(SubDivisionObj:any){
      return this._http.post("https://hes.visiontek.co.in:8005/api/GetDBSubDivisions", SubDivisionObj)
    }
    SubStationsService(SubStationsObj:any){
      return this._http.post("https://hes.visiontek.co.in:8005/api/GetDBSubStations", SubStationsObj)
    }
    PiechartService(PiechartObj:any){
      return this._http.post("https://hes.visiontek.co.in:8005/api/PiechartSummary", PiechartObj)
    }
      }


