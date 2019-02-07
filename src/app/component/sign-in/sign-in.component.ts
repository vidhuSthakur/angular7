import { Injectable, NgZone, Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    signinForm: FormGroup;
    submitted = false;
    
  constructor(
     public authService: AuthService,
     private formBuilder: FormBuilder, 
     public router: Router,  
     public ngZone: NgZone
  ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
  }
  
  get f() { return this.signinForm.controls; }
  
  onSubmit(email, password) {

        this.submitted = true;

        // stop here if form is invalid
        if (this.signinForm.invalid) {
            return;
        }
        this.SignIn(email, password);
        
    }
    
  SignIn(email, password){
      this.authService.SignIn(email, password)
        .then((result) => {
            this.ngZone.run(() => {
              this.router.navigate(['dashboard']);
            });
        this.authService.SetUserData(result.user);
      }).catch((error) => {
          debugger
        window.alert(error.message)
        //window.alert("here")
      })
  }   

}
