import { Injectable } from '@angular/core';
import { AnonSubGiftUserstate, AnonSubMysteryGiftUserstate, ChatUserstate, Client, Options, SubMethods, SubMysteryGiftUserstate, SubUserstate } from 'tmi.js';
import { Subject } from 'rxjs';
import { Message } from '../models/message';

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

    this.twitchClient.on('message', (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
      // Ignore echoed messages.
      if (self) return;
    
      // Echo message
      this.chatMessage.next( {...userstate, 'channel': channel, 'message': message} );
    });

    this.twitchClient.on('cheer', (channel: string, userstate: ChatUserstate, message: string) => {
      this.chatMessage.next( {...userstate, 'channel': channel, 'message': message} );
    });

    this.twitchClient.on('raided', (channel: string, username: string, viewers: number) => {
      this.chatMessage.next( {'channel': channel, "message-type": 'raid', 'message': `${username} raided with ${viewers} viewers!`} );
    });

    this.twitchClient.on('subscription', (channel: string, username: string, methods: SubMethods, message: string, userstate: SubUserstate) => {
      this.chatMessage.next( {...userstate, 'channel': channel, 'message': `${username} just subscribed! ${message ? message : ''}`} );
    });

    this.twitchClient.on('resub', (channel: string, username: string, months: number, message: string, userstate: SubUserstate, methods: SubMethods) => {
      this.chatMessage.next( {...userstate, 'channel': channel, 'message': `${username} resubscribed for ${months} months! ${message ? message : ''}`} );
    });

    this.twitchClient.on('anonsubgift', (channel: string, streakMonths: number, recipient: string, methods: SubMethods, userstate: AnonSubGiftUserstate) => {
      this.chatMessage.next( {...userstate, 'channel': channel, 'message': `An anonymous user gifted a sub to ${recipient}!`} );
    });

    this.twitchClient.on('anonsubmysterygift', (channel: string, numbOfSubs: number, methods: SubMethods, userstate: AnonSubMysteryGiftUserstate) => {
      this.chatMessage.next( {...userstate, 'channel': channel, 'message': `An anonymous user gifted ${numbOfSubs} subscriptions to the community!`} );
    });

    this.twitchClient.on('submysterygift', (channel: string, username: string, numbOfSubs: number, methods: SubMethods, userstate: SubMysteryGiftUserstate) => {
      this.chatMessage.next( {...userstate, 'channel': channel, 'message': `${username} gifted ${numbOfSubs} subscriptions to the community!`} );
    });

    this.twitchClient.on('redeem', (channel: string, username: string, rewardType: 'highlighted-message' | 'skip-subs-mode-message' | string, tags: ChatUserstate) => {
      this.chatMessage.next( {...tags, 'channel': channel, 'message': `${username} redeemed ${rewardType}`, "message-type": 'redeem'} );
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
