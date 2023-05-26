import { Injectable } from '@angular/core';
import { Client, Options } from 'tmi.js';
import { Message } from '../models/message';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  chatMessage!: Observable<Message>;

  twitchClient: Client;

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

    this.twitchClient.on('message', (channel, tags, message, self) => {
      // Ignore echoed messages.
      if (self) return;
    
      // Echo message
      this.chatMessage = of( {...tags, 'channel': channel, 'message': message} );
    });
  }

  selectChannels(channels: string[]): void {
    for(const channel of channels) {
      this.twitchClient.join(channel);
    }
  }

}
