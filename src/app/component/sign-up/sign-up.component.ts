import { Component, OnInit } from '@angular/core';
//import { User } from "../../shared/services/user";
import { AuthService } from "../../auth/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
//import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    signupForm: FormGroup;
    submitted = false;
    
  constructor(
     public authService: AuthService,
     private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
  }
  
  get f() { return this.signupForm.controls; }
  
  onSubmit(email, password) {

        this.submitted = true;

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }
        //alert(email);
        this.SignUp(email, password);
        
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value))
    }
    
  SignUp(email, password){
     // alert(email +'>>'+ password);
      this.authService.SignUp(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.authService.SendVerificationMail();
        this.authService.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }  

}
