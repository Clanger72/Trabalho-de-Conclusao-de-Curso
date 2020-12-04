import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { RegisterUserService } from './shared/services/user.service';
import { RegisterUser } from './shared/model/register-user.model';
import { DependentService } from './shared/services/dependent.service';
import { DependentData } from './shared/model/dependent-data';
import { SignatureModel, Template, SendContract, TemplateDependent, ListContract } from './shared/model/contract';
import { RegisterSignerService } from './shared/services/register-signer.service';
import { EmbedModel } from './shared/model/signature-model';

import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { DependentUserComponent } from './dependent-user/dependent-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ContractSignatureComponent } from './contract-signature/contract-signature.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    HomeUserComponent,
    DependentUserComponent,
    UserProfileComponent,
    VerifyEmailComponent,
    ContractSignatureComponent,
    HomeAdminComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  providers: [
    RegisterUserService,
    RegisterUser,
    DependentService,
    DependentData,
    SignatureModel,
    RegisterSignerService,
    EmbedModel,
    Template,
    SendContract,
    TemplateDependent,
    ListContract
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
