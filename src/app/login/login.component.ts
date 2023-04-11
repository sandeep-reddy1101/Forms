import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpservicesService } from '../services/httpservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage : string = '';

  constructor(public fb: FormBuilder, private service: HttpservicesService, private route: Router) {
  }

  ngOnInit() {
    
  }

  loginForm = this.fb.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(8)]]
  });

  getControls(name: any) {
    return this.loginForm.get(name);
  }

  onsubmit() {
    this.errorMessage = '';
    console.log(this.loginForm.value);
    this.service.verifyUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(data=>{
      if(data.login){
        this.route.navigate(['/playground'])
      } else {
        this.errorMessage = data.message;
      }
    })
  }

}
