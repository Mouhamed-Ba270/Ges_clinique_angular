import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postClinique(data : any){
    return this.http.post<any>("http://localhost:3000/cliniqueList/",data);
  }
  getClinique(){
    return this.http.get<any>("http://localhost:3000/cliniqueList/");
  }
  putRendezVous(data:any, id : number){
    return this.http.put<any>("http://localhost:3000/cliniqueList/"+id,data);
  }
  deleteRendezVous(id : number){
    return this.http.delete<any>("http://localhost:3000/cliniqueList/"+id);
  }
}
