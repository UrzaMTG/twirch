import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { environment } from 'src/environments/environment.development';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutDialogComponent } from './components/aboutDialog/aboutDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

const config: SocketIoConfig = {
  url: environment.serverUrl,
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
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent]
})
export class AppModule { }
