import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutDialogComponent } from './components/aboutDialog/aboutDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

const config: SocketIoConfig = {
  url: 'https://twirch.io',
  options: {
    transports: ['polling', 'websocket'],
    closeOnBeforeunload: true
  },
};

@NgModule({
  declarations: [		
    AppComponent,
    AboutDialogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent]
})
export class AppModule { }
