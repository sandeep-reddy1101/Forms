import { Injectable } from '@angular/core';
import { HttpservicesService } from './httpservices.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpServices : HttpservicesService) { }

  verifyLogin(emailId: any, password: any) {
    this.httpServices.verifyUser(emailId, password).subscribe(data=>{
      if(data){
        return data
      }
    })
  }

}
