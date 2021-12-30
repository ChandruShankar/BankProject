import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { BarChatComponent } from './bar-chat/bar-chat.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SpendingsChartComponent } from './spendings-chart/spendings-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    BarChatComponent,
    LoginComponent,
    UploadFileComponent,
    PieChartComponent,
    SpendingsChartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
