import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { Message } from './models/message';
import { ChannelService } from './services/channel-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  title = 'twirch';

  private _msgSub?: Subscription;
  
  constructor(private location: Location, private channelService: ChannelService) {
    channelService.selectChannels(location.path().split('/').splice(1));
  }

  ngOnInit(): void {
    this._msgSub = this.channelService.chatMessage.subscribe((msg) => this.processMessage(msg));
  }
  
  ngOnDestroy(): void {
    this._msgSub?.unsubscribe();
  }

  private processMessage(msg: Message): void {
    // Add timestamp
    msg.timestamp = new Date(Date.now());

    // Replace emotes
    // https://static-cdn.jtvnw.net/emoticons/v1/[emote_id]/1.0


    // Strip/escape HTML


    // Push to bound array
    this.messages.push(msg);
  }
    
}
