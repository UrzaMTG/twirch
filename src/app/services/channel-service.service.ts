import { Injectable } from '@angular/core';
import { Client, Options } from 'tmi.js';
import { Message } from '../models/message';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private twitchClient?: Client;
  chatMessage: Subject<Message> = new Subject<Message>();
  connectionFinished: Subject<boolean> = new Subject<boolean>();

  constructor() {
    const opts: Options = {
      options: {
        skipMembership: true,
        debug: false,
      },
      connection: {
        reconnect: true,
        secure: true,
      }
    }
    this.twitchClient = new Client(opts);

    this.twitchClient.on('connected', (address, port) => {
      this.connectionFinished.next(true);
    });

    this.twitchClient.on('message', (channel, tags, message, self) => {
      // Ignore echoed messages.
      if (self) return;
    
      // Echo message
      this.chatMessage.next( {...tags, 'channel': channel, 'message': message} );
    });

    this.twitchClient.connect().catch( (error) => console.log(error) );
  }

  selectChannels(channels: string[]): void {
    if (this.twitchClient) {
      for(const channel of channels) {
        this.twitchClient.join(channel);
      }
    }
  }

}
