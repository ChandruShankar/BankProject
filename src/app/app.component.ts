import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bankproj';
  constructor(
    private http:HttpClient
  ){

  }
  name:string='';
  file: any;
  // getName(name:string){
  //   this.name=name;
  // }
  getfile(event:any){
    this.file=event.target.files[0];
    console.log('file',this.file);
  }
  submitData(){
    let formData = new FormData();
    // formData.set('name',this.name);
    formData.set('file',this.file);
    //submit this data in API
    this.http.post('',formData)
    .subscribe((response)=>{});
  }
  
};

