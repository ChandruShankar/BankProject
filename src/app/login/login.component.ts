import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  email = "qaqaqa"
  password = "qaqaqa"


  constructor ( private router:Router){}



  onSubmit(form: NgForm){
   
    this.isLoading = true;

    const email = form.value.email;
    const pswd = form.value.password;

    console.log("email: "+ email + " pswd: "+pswd)
    this.isLoading = false;
    if (email == null || pswd == null)
    return alert("Empty field")
    
    if (this.email !== email)
    return alert("Wrong email")
  
    if (this.password !== pswd)
    return alert("Wrong password")

    this.router.navigate(['./upload-file']);
    form.reset();
  
  }

  ngOnInit(): void {
  }

}

