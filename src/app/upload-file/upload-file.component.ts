import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankData } from '../bar-chat/data.model';

export interface ResponseData {
  Balance: number,
  Credit: number,
  Debit: number
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

 
 
  name: string = '';
  file: any;
  isLoading: Boolean = false;
  @Input() responseData: BankData = new BankData()
 

  constructor(private http:HttpClient){}
  ngOnInit(): void {
  }

  getfile(event:any){
    this.file=event.target.files[0];
    console.log('file', this.file);
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    let formData = new FormData();
    // formData.set('name',this.name);
    formData.set('file', this.file);

    //submit this data in API
    return this.http.post<ResponseData>('http://localhost:5000/file-upload', formData)
    .subscribe((response)=>{ 
      this.isLoading = false;
      this.responseData = new BankData(response.Balance, response.Credit, response.Debit)
      console.log(response)
     });
  }


}
