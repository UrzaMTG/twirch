import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3080',
  options: {
    transports: ['websocket', 'polling']
  }
};

@NgModule({
  declarations: [		
    AppComponent,
    ToolbarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
