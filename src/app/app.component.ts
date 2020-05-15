import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material';
import { AuthService, FacebookLoginProvider,GoogleLoginProvider, SocialUser } from 'angularx-social-login';


//https://tudip.com/blog-post/how-to-install-angular-material/
//link do google button SVG pronto, sem integrara com aip ainda
const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean = false; 

  constructor (
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
          this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    }

    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        console.log('this.user', this.user);
      });
    } 
    
    //@Output() mudouValor = new EventEmitter();

    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
  

  }
