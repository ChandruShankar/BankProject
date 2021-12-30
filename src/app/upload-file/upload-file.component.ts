import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankData } from '../bar-chat/data.model';

export interface ResponseData {
  label: string;
  amount: number;
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
  chartData: ResponseData[] = new Array()
  pieChartData: ResponseData[] = new Array()
  spentCredit: ResponseData[] = new Array()
  spentDebit: ResponseData[] = new Array()
  
  response: any
  noCredit: number = 0
  noDebit: number = 0

  constructor(private http:HttpClient){}
  ngOnInit(): void {
  }

  getfile(event:any){
    this.file=event.target.files[0];
    console.log('file', this.file);
  }
 errmsg=''
  onSubmit(form: NgForm){
    this.isLoading = true;
    let formData = new FormData();
    // formData.set('name',this.name);
    formData.set('file', this.file);

    //submit this data in API
    return this.http.post('http://localhost:5000/file-upload', formData).subscribe((response)=>{ 

      this.isLoading = false;
      this.response = response     
      this.onParse(response)
     },error=>
     {
       this.errmsg="Please Select File"
     });
  }


  
  onParse(data: any){
   
    this.chartData = data[2].total.map((a: ResponseData) => new chartData(a.amount, a.label))
    this.pieChartData = data[2].total.map((a: ResponseData) => new chartData(a.amount, a.label))
    this.pieChartData.pop()
    this.spentDebit = data[1].month_debit.map((a: ResponseData) => new chartData(a.amount, a.label))
    this.spentCredit = data[0].month_credit.map((a: ResponseData) => new chartData(a.amount, a.label))
   
    this.noCredit = data[3].noTotal[0].amount
    this.noDebit = data[3].noTotal[1].amount

  }


}

export class chartData {
  amount: number;
  label: string;
  constructor(amount: number = 0, label: string = ''){
    this.amount = amount;
    this.label = label;
  }

}

