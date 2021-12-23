import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/upload-file', pathMatch: 'full' },
  { path: 'upload-file', component: UploadFileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
