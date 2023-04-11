import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpservicesService } from '../services/httpservices.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  passwordMatchErrorMessage : string = "";
  registerSuccessMessage : string = "";
  errorMessage : string = "";

  constructor(public fb:FormBuilder, private service: HttpservicesService, private route : Router) {}

  registerForm = this.fb.group({
    firstName : ['', [Validators.required]],
    lastName : ['', [Validators.required]],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword : ['', [Validators.required, Validators.minLength(8)]]
  })

  getControls(name: any) {
    return this.registerForm.get(name);
  }

  onsubmit(){
    this.passwordMatchErrorMessage = this.registerSuccessMessage = this.errorMessage = "";
    if(this.checkConfirmPassword()) {  
      let userInfo = this.registerForm.value;
      delete userInfo.confirmPassword;
      
      this.service.insertUser(userInfo).subscribe(data=>{
        console.log(data)
        if(data.inserted) {
          this.registerForm.reset();
          this.registerSuccessMessage = "Your registration is successful!!!"
          this.router()
        } else {
          this.errorMessage = data.message;
        }
      })
    } else {
      this.passwordMatchErrorMessage = "Password and Confirm password should match."
    }
  }

  checkConfirmPassword() {
    if (this.registerForm.value.confirmPassword === this.registerForm.value.password){
      return true
    } else {
      return false
    }
  }

  router() {
    this.route.navigate(['/login']);
  }

}
